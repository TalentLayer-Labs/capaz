import { ethers } from 'hardhat'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  // Deploy escrow factory
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = CapazEscrowFactory.attach('0x07B9837e81b917451690f2eF4752AC5F1434450B')

  // Get escrow contract
  const tokenId = 0
  const escrow = await capazEscrowFactory.getEscrow(tokenId)
  const CapazEscrow = await ethers.getContractFactory('CapazEscrow')
  const capazEscrow = CapazEscrow.attach(escrow.escrowAddress)

  // Distribute yield
  const distributeYieldTx = await capazEscrow.distributeYield(accounts[0].address, accounts[1].address)
  await distributeYieldTx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
