import { ethers } from 'hardhat'

import { AAVE_STRATEGY_ADDRESS, TOKEN_ADDRESS } from '../../constants/addresses'
import { getAaveStrategyContract, getTokenContract, getTokenContractAtAddress } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const tokenContract = getTokenContract(accounts[0])
  const allowance = await tokenContract.allowance(accounts[0].address, AAVE_STRATEGY_ADDRESS)

  const aaveStrategy = await getAaveStrategyContract()
  const aTokenAddress = await aaveStrategy.getYieldTokenFromUnderlying(TOKEN_ADDRESS)
  const aTokenContract = getTokenContractAtAddress(aTokenAddress, accounts[0])

  const yieldTokenAllowance = await aTokenContract.allowance(accounts[0].address, AAVE_STRATEGY_ADDRESS)

  console.log('Token Allowance: ', allowance.toString())
  console.log('Yield token Allowance: ', yieldTokenAllowance.toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
