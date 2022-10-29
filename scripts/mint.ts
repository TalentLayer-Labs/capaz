import { ethers } from 'hardhat'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  // Get escrow factory contract
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = CapazEscrowFactory.attach('0x07B9837e81b917451690f2eF4752AC5F1434450B')

  // Get token contract
  const SimpleERC20 = await ethers.getContractFactory('SimpleERC20')
  const simpleERC20 = SimpleERC20.attach('0xC1ee53801a6350311a5942da3084aD500cA30620')

  // Approve tokens
  const amount = 10000

  const approveTx = await simpleERC20.approve(capazEscrowFactory.address, amount)
  await approveTx.wait()

  const startTime = Math.floor(new Date().getTime() / 1000 + 5) // now + 5 seconds

  // Create a new escrow
  const mintTx = await capazEscrowFactory.mint({
    sender: accounts[0].address,
    receiver: accounts[1].address,
    tokenAddress: simpleERC20.address,
    totalAmount: amount,
    startTime,
    periodDuration: 2,
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
