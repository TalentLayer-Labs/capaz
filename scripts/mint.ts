import { ethers } from 'hardhat'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  // Get escrow factory contract
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = CapazEscrowFactory.attach('0x07B9837e81b917451690f2eF4752AC5F1434450B')

  // Get token contract
  const CapazERC20 = await ethers.getContractFactory('CapazERC20')
  const capazERC20 = CapazERC20.attach('0x58f7Fc8d443507B9A14A0Fe33330F07c85b474e9')

  // Approve tokens
  const amount = 10000

  const approveTx = await capazERC20.approve(capazEscrowFactory.address, amount)
  await approveTx.wait()

  const startTime = Math.floor(new Date().getTime() / 1000 + 5) // now + 5 seconds

  // Create a new escrow
  const mintTx = await capazEscrowFactory.mint({
    sender: accounts[0].address,
    receiver: accounts[1].address,
    tokenAddress: capazERC20.address,
    totalAmount: amount,
    startTime,
    periodDuration: 1,
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
