import { ethers } from 'hardhat'

async function main() {
  // Deploy CapazEscrowFactory Contract
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = await CapazEscrowFactory.deploy()
  console.log('CapazEscrowFactory deployed to:', capazEscrowFactory.address)

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
