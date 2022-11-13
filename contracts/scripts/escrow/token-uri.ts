import { ethers } from 'hardhat'
import { CAPAZ_ESCROW_FACTORY_ADDRESS } from '../../constants/addresses'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  // Deploy escrow factory
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = CapazEscrowFactory.attach(CAPAZ_ESCROW_FACTORY_ADDRESS)

  const tokenId = 0
  const tokenUri = await capazEscrowFactory.tokenURI(tokenId)

  console.log('Token URI: ', tokenUri)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
