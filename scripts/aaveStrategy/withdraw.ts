import { ethers } from 'hardhat'

import { AAVE_STRATEGY_ADDRESS, TOKEN_ADDRESS } from '../../constants/addresses'
import { getAaveStrategyContract, getTokenContractAtAddress } from '../../utils/contracts'

async function main() {
  // Deploy contract
  const accounts = await ethers.getSigners()

  console.log('Using address: ', accounts[0].address)

  const amount = 1000000

  const aaveStrategy = await getAaveStrategyContract()

  const aUsdcAddress = await aaveStrategy.getYieldTokenFromUnderlying(TOKEN_ADDRESS)
  const aUsdcContract = getTokenContractAtAddress(aUsdcAddress, accounts[0])

  const approveTx = await aUsdcContract.approve(AAVE_STRATEGY_ADDRESS, amount)
  await approveTx.wait()

  // Withdraw from AAVE
  const tx = await aaveStrategy.claim(TOKEN_ADDRESS, amount, '0x8d960334c2ef30f425b395c1506ef7c5783789f3')
  await tx.wait()

  console.log('Txn hash: ', tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
