import { ethers } from 'hardhat'

import { getAaveStrategyContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const aaveStrategy = await getAaveStrategyContract()
  const pool = await aaveStrategy.pool()

  console.log('Pool: ', pool)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
