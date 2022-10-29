import { ethers } from 'hardhat'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const AaveStrategy = await ethers.getContractFactory('AaveStrategy')
  const aaveStrategy = await AaveStrategy.deploy()

  await aaveStrategy.deployed()

  console.log('Deployed AaveStrategy at:', aaveStrategy.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
