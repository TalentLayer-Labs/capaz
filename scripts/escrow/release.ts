import { ethers } from 'hardhat'
import { CAPAZ_ESCROW_FACTORY_ADDRESS } from '../../constants/addresses'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  // Deploy escrow factory
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = CapazEscrowFactory.attach(CAPAZ_ESCROW_FACTORY_ADDRESS)

  // Get escrow contract
  const tokenId = 0
  const escrow = await capazEscrowFactory.getEscrow(tokenId)
  const CapazEscrow = await ethers.getContractFactory('CapazEscrow')
  const capazEscrow = CapazEscrow.attach(escrow.escrowAddress).connect(accounts[1]) // connect to receiver

  // Release tokens
  const releaseTx = await capazEscrow.release()
  await releaseTx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
