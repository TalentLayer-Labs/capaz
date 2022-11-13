import { ethers } from 'hardhat'
import { CAPAZ_ESCROW_FACTORY_ADDRESS } from '../../constants/addresses'
import { getTokenContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  // Get escrow factory contract
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = CapazEscrowFactory.attach(CAPAZ_ESCROW_FACTORY_ADDRESS)

  // Get token contract
  const tokenContract = getTokenContract(accounts[0])

  // Approve tokens
  const amount = 100000000 // 100 tokens

  const approveTx = await tokenContract.approve(capazEscrowFactory.address, amount)
  await approveTx.wait()

  const startTime = Math.floor(new Date().getTime() / 1000 + 120) // now + 2 minutes

  // Create a new escrow
  const mintTx = await capazEscrowFactory.mint({
    sender: accounts[0].address,
    receiver: accounts[1].address,
    tokenAddress: tokenContract.address,
    totalAmount: amount,
    startTime,
    periodDuration: 60, // every minute
    periods: 10,
    yieldStrategyId: 1,
    escrowAddress: '0x0000000000000000000000000000000000000000',
  })
  await mintTx.wait()

  console.log('Txn hash: ', mintTx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
