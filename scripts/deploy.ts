import { ethers } from 'hardhat'
import { AAVE_POOL_ADDRESS } from '../constants/addresses'

async function main() {
  // Deploy CapazEscrowFactory Contract
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = await CapazEscrowFactory.deploy()
  console.log('CapazEscrowFactory deployed to:', capazEscrowFactory.address)

  // Setup strategy pools
  capazEscrowFactory.setStrategyPool(1, AAVE_POOL_ADDRESS)

  // Deploy CapazEscrowFactory Contract
  const SimpleERC20 = await ethers.getContractFactory('SimpleERC20')
  const simpleERC20 = await SimpleERC20.deploy()
  console.log('SimpleERC20 deployed to:', simpleERC20.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
