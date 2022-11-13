import { ethers } from 'hardhat'
import { AAVE_POOL_ADDRESS } from '../constants/addresses'

const wETHAddress = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' //polygon mainnet weth address

async function main() {
  // Deploy AAVE Strategy Contract
  const AaveStrategy = await ethers.getContractFactory('AaveStrategy')
  const aaveStrategy = await AaveStrategy.deploy('0x6C9fB0D5bD9429eb9Cd96B85B81d872281771E6B')
  console.log('AaveStrategy deployed to:', aaveStrategy.address)

  // // Deploy CapazEscrowFactory Contract
  // const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  // const capazEscrowFactory = await CapazEscrowFactory.deploy()
  // console.log('CapazEscrowFactory deployed to:', capazEscrowFactory.address)

  // // Setup strategy pools
  // const tx = await capazEscrowFactory.setStrategy(1, '0xf6597b08A75A9427F0C332601a196C379c3A27cE')
  // await tx.wait()

  // // Deploy CapazWETHAdapter Contract
  // const CapazWETHAdapter = await ethers.getContractFactory('CapazWETHAdapter')
  // const capazWETHAdapter = await CapazWETHAdapter.deploy(capazEscrowFactory.address, wETHAddress)
  // console.log('CapazWETHAdapter deployed to:', capazWETHAdapter.address)

  // //Deploy SimpleERC20 Contract
  // const CapazERC20 = await ethers.getContractFactory('CapazERC20')
  // const capazERC20 = await CapazERC20.deploy()
  // console.log('capazERC20 deployed to:', capazERC20.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
