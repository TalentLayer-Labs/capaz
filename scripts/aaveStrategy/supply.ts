import { ethers } from 'hardhat'

import { AAVE_POOL_ADDRESS, AAVE_STRATEGY_ADDRESS, TOKEN_ADDRESS } from '../../constants/addresses'
import { getAaveStrategyContract, getTokenContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const amount = 10000000

  const aaveStrategy = await getAaveStrategyContract()
  const usdcContract = getTokenContract(accounts[0])

  const approveTx = await usdcContract.approve(AAVE_STRATEGY_ADDRESS, amount)
  await approveTx.wait()

  // Supply to Aave
  const depositTx = await aaveStrategy.deposit(AAVE_POOL_ADDRESS, TOKEN_ADDRESS, amount)
  await depositTx.wait()

  console.log('Txn hash: ', depositTx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
