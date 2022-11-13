import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { BigNumber, Contract } from 'ethers'
import { ethers } from 'hardhat'
import { AAVE_STRATEGY_ADDRESS, TOKEN_ADDRESS } from '../constants/addresses'
import { AaveStrategy } from '../types/contracts/AaveStrategy'
import {
  getAavePoolContract,
  getAaveStrategyContract,
  getTokenContract,
  getTokenContractAtAddress,
} from '../utils/contracts'

describe('AAVE Strategy', () => {
  let aaveStrategy: AaveStrategy
  let user: SignerWithAddress
  let usdcContract: Contract
  let aavePool: Contract

  before(async function () {
    this.timeout(5 * 60 * 1000)

    const accounts = await ethers.getSigners()
    user = accounts[0]

    aaveStrategy = await getAaveStrategyContract()
    usdcContract = await getTokenContract(user)
    aavePool = await getAavePoolContract(user)

    const aTokenAddress = await aaveStrategy.getYieldTokenFromUnderlying(TOKEN_ADDRESS)
    const aTokenContract = getTokenContractAtAddress(aTokenAddress, user)

    const aTokenTx = await aTokenContract.approve(AAVE_STRATEGY_ADDRESS, 1000000000)
    await aTokenTx.wait()
  })

  describe('when a deposit is done', async () => {
    const depositAmount = 10000000

    let userBalance: BigNumber
    let aaveAccountData: Record<string, any>

    before(async function () {
      this.timeout(5 * 60 * 1000)

      userBalance = await usdcContract.balanceOf(user.address)
      aaveAccountData = await aavePool.getUserAccountData(user.address)

      // Approve spending of tokens
      const approveTx = await usdcContract.approve(AAVE_STRATEGY_ADDRESS, depositAmount)
      await approveTx.wait()

      // Supply to Aave
      const depositTx = await aaveStrategy.deposit(TOKEN_ADDRESS, depositAmount)
      await depositTx.wait()
    })

    it('increases user contract collateral balance on AAVE', async () => {
      // Get AAVE account data
      const updatedAaveAccountData = await aavePool.getUserAccountData(user.address)

      expect(updatedAaveAccountData.totalCollateralBase - aaveAccountData.totalCollateralBase).to.be.greaterThanOrEqual(
        depositAmount * 100,
      ) // Multiply by 100 because AAVE balances have 8 decimals
    })

    it('decreases user token balance', async () => {
      const updatedUserBalance = await usdcContract.balanceOf(user.address)
      expect(updatedUserBalance).to.eq(userBalance.sub(depositAmount))
    })

    // TODO: test user aToken balance is increased
  })

  describe('when a claim is done', async () => {
    const claimAmount = 2000000
    const receiver = '0x0Ba0C3E897fA7Ee61d177b392bf88A2AEc747fE8'

    let receiverBalance: BigNumber
    let aaveAccountData: Record<string, any>

    before(async function () {
      this.timeout(5 * 60 * 1000)

      receiverBalance = await usdcContract.balanceOf(receiver)
      aaveAccountData = await aavePool.getUserAccountData(user.address)

      // Claim the deposit from AAVE
      const tx = await aaveStrategy.claim(TOKEN_ADDRESS, claimAmount, receiver)
      await tx.wait()
    })

    it('decreases AaveStrategy contract collateral balance on AAVE', async () => {
      // Get AAVE account data
      const updatedAaveAccountData = await aavePool.getUserAccountData(user.address)

      expect(aaveAccountData.totalCollateralBase - updatedAaveAccountData.totalCollateralBase).to.be.lessThanOrEqual(
        claimAmount * 100,
      ) // Multiply by 100 because AAVE balances have 8 decimals
      // Add 1 for accumulated interest?
    })

    it('increases receiver token balance by the claimed amount', async () => {
      const updatedReceiverBalance = await usdcContract.balanceOf(receiver)
      expect(updatedReceiverBalance).to.eq(receiverBalance.add(claimAmount))
    })

    // TODO: test user aToken balance is decreased
  })

  describe('when a full claim is done', async () => {
    const receiver = '0x0Ba0C3E897fA7Ee61d177b392bf88A2AEc747fE8'

    let receiverBalance: BigNumber
    let aaveAccountData: Record<string, any>

    before(async function () {
      this.timeout(5 * 60 * 1000)

      receiverBalance = await usdcContract.balanceOf(receiver)

      aaveAccountData = await aavePool.getUserAccountData(user.address)

      console.log('Collateral balance: ', aaveAccountData.totalCollateralBase)

      // Claim the deposit from AAVE
      const tx = await aaveStrategy.claimAll(TOKEN_ADDRESS, receiver)
      await tx.wait()
    })

    it('sets AaveStrategy contract collateral balance on AAVE to 0', async () => {
      // Get AAVE account data
      const updatedAaveAccountData = await aavePool.getUserAccountData(user.address)

      expect(updatedAaveAccountData.totalCollateralBase).to.be.eq(0)
    })

    it('increases receiver token balance by the claimed collateral balance', async () => {
      const updatedReceiverBalance = await usdcContract.balanceOf(receiver)

      // We check for being greater than or equal to (instead of exact equality) because of accumulated interest
      expect(updatedReceiverBalance).to.be.greaterThanOrEqual(
        receiverBalance.add(aaveAccountData.totalCollateralBase / 100),
      )
    })

    // TODO: test user aToken balance is decreased
  })
})
