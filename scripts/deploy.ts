import { ethers } from 'hardhat'

async function main() {
  //   const CapazEscrow = await ethers.getContractFactory('CapazEscrow')
  //   const capazEscrow = await CapazEscrow.deploy()
  console.log('coucou')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
