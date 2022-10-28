import { ethers } from 'hardhat'

import { AAVE_POOL_ADDRESS, TOKEN_ADDRESS } from '../../constants/addresses'
import { getAaveStrategyContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const amount = 1000000

  const aaveStrategy = await getAaveStrategyContract()

  // Withdraw from AAVE
  const tx = await aaveStrategy.claim(
    AAVE_POOL_ADDRESS,
    TOKEN_ADDRESS,
    amount,
    '0x0Ba0C3E897fA7Ee61d177b392bf88A2AEc747fE8',
  )
  await tx.wait()

  console.log('Txn hash: ', tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
