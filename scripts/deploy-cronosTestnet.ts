import { ethers } from 'hardhat'
import { AAVE_POOL_ADDRESS } from '../constants/addresses'

const wETHAddress = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' //polygon mainnet weth address

async function main() {
  // Deploy AAVE Strategy Contract
  //AaveStrategy deployed Cronos Testnet: 0x00F55088c15b9bF75e6a19699fA2b32FB1388126
  const AaveStrategy = await ethers.getContractFactory('AaveStrategy')
  const aaveStrategy = await AaveStrategy.deploy(AAVE_POOL_ADDRESS)
  console.log('AaveStrategy deployed to:', aaveStrategy.address)

  // Deploy CapazEscrowFactory Contract
  //CapazEscrowFactory deployed on Cronos: 0x2eD3f237aEa7624669aa6AF363f1b1CC67772931
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = await CapazEscrowFactory.deploy()
  console.log('CapazEscrowFactory deployed to:', capazEscrowFactory.address)

  // Setup strategy pools
  const tx = await capazEscrowFactory.setStrategy(1, '0xf6597b08A75A9427F0C332601a196C379c3A27cE')
  await tx.wait()

  // Deploy CapazWETHAdapter Contract
  const CapazWETHAdapter = await ethers.getContractFactory('CapazWETHAdapter')
  const capazWETHAdapter = await CapazWETHAdapter.deploy(capazEscrowFactory.address, wETHAddress)
  console.log('CapazWETHAdapter deployed to:', capazWETHAdapter.address)

  //Deploy SimpleERC20 Contract
  //capazERC20 deployed on Cronos Testnet: 0x962F2585Da1B901CAB10ab447f8cb40Cc15b3197
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
