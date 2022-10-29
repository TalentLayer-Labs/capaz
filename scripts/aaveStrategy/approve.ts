import { ethers } from 'hardhat'

import { AAVE_STRATEGY_ADDRESS, TOKEN_ADDRESS } from '../../constants/addresses'
import { getAaveStrategyContract, getTokenContract, getTokenContractAtAddress } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const usdcContract = getTokenContract(accounts[0])
  const tx = await usdcContract.approve(AAVE_STRATEGY_ADDRESS, 1000000000)
  await tx.wait()

  const aaveStrategy = await getAaveStrategyContract()
  const aTokenAddress = await aaveStrategy.getYieldTokenFromUnderlying(TOKEN_ADDRESS)
  const aTokenContract = getTokenContractAtAddress(aTokenAddress, accounts[0])

  const aTokenTx = await aTokenContract.approve(AAVE_STRATEGY_ADDRESS, 1000000000)
  await aTokenTx.wait()

  console.log('Transaction hash: ', tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
