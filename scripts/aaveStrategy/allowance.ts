import { ethers } from 'hardhat'

import { AAVE_STRATEGY_ADDRESS } from '../../constants/addresses'
import { getTokenContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const usdcContract = getTokenContract()
  const allowance = await usdcContract.allowance(accounts[0].address, AAVE_STRATEGY_ADDRESS)

  console.log('Allowance: ', allowance.toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
