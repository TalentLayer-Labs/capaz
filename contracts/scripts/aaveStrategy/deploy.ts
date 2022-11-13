import { ethers } from 'hardhat'
import { AAVE_POOL_ADDRESS } from '../../constants/addresses'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const AaveStrategy = await ethers.getContractFactory('AaveStrategy')
  const aaveStrategy = await AaveStrategy.deploy(AAVE_POOL_ADDRESS)

  await aaveStrategy.deployed()

  console.log('Deployed AaveStrategy at:', aaveStrategy.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
