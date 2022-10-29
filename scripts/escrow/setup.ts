import { ethers } from 'hardhat'
import { AAVE_POOL_ADDRESS } from '../../constants/addresses'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  // Deploy escrow factory
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = await CapazEscrowFactory.deploy()

  // Setup strategy pools
  capazEscrowFactory.setStrategyPool(1, AAVE_POOL_ADDRESS)

  // Deploy example token
  const SimpleToken = await ethers.getContractFactory('SimpleERC20')
  const simpleToken = await SimpleToken.deploy()

  console.log('Deployed CapazEscrowFactory at:', capazEscrowFactory.address)
  console.log('Deployed SimpleToken at:', simpleToken.address)

  // Approve tokens
  const amount = 10

  const approveTx = await simpleToken.approve(capazEscrowFactory.address, amount)
  await approveTx.wait()

  // Create a new escrow
  const tx = await capazEscrowFactory.mint({
    sender: accounts[0].address,
    receiver: accounts[0].address,
    tokenAddress: simpleToken.address,
    totalAmount: amount,
    startTime: 1668035169,
    periodDuration: 600,
    periods: 10,
    yieldStrategyId: 1,
    escrowAddress: '0x0000000000000000000000000000000000000000',
  })

  await tx.wait()

  console.log('Txn hash: ', tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
