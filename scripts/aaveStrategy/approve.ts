import { ethers } from 'hardhat'

import { AAVE_STRATEGY_ADDRESS, TOKEN_ADDRESS } from '../../constants/addresses'
import { getTokenContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const usdcContract = getTokenContract(accounts[0])
  const tx = await usdcContract.approve(AAVE_STRATEGY_ADDRESS, 10000000)
  await tx.wait()

  console.log('Transaction hash: ', tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
