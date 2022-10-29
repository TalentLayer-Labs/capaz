import { ethers } from 'hardhat'

import { getAavePoolContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const aavePool = getAavePoolContract(accounts[0])

  const accountData = await aavePool.getUserAccountData(accounts[0].address)

  console.log('Account data: ', accountData)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
