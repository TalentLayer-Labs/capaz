import { ethers } from 'hardhat'

async function main() {
  // Deploy CapazEscrowFactory Contract
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = await CapazEscrowFactory.deploy()
  console.log('CapazEscrowFactory deployed to:', capazEscrowFactory.address)

  // Deploy SimpleERC20 Contract
  const CapazERC20 = await ethers.getContractFactory('CapazERC20')
  const capazERC20 = await CapazERC20.deploy()
  console.log('capazERC20 deployed to:', capazERC20.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
