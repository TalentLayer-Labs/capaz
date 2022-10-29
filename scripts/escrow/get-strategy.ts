import { ethers } from 'hardhat'
import { CAPAZ_ESCROW_FACTORY_ADDRESS } from '../../constants/addresses'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  // Get escrow factory contract
  const CapazEscrowFactory = await ethers.getContractFactory('CapazEscrowFactory')
  const capazEscrowFactory = CapazEscrowFactory.attach(CAPAZ_ESCROW_FACTORY_ADDRESS)

  const strategy = await capazEscrowFactory.getStrategy(1)

  console.log('Strategy: ', strategy)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
