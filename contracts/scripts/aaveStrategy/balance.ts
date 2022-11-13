import { ethers } from 'hardhat'

import { getTokenContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const usdcContract = getTokenContract()
  const balance = await usdcContract.balanceOf(accounts[0].address)

  console.log('Balance: ', balance.toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
