import { ethers } from 'hardhat'
import { TOKEN_ADDRESS } from '../../constants/addresses'

import { getAaveStrategyContract } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const aaveStrategy = await getAaveStrategyContract()
  const aToken = aaveStrategy.getYieldTokenFromUnderlying(TOKEN_ADDRESS)

  console.log('Account data: ', aToken)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
