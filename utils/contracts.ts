import { Contract } from 'ethers'
import { ethers } from 'hardhat'
import { AAVE_POOL_ADDRESS, AAVE_STRATEGY_ADDRESS, TOKEN_ADDRESS } from '../constants/addresses'

import ERC20Abi from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json'
import AavePoolAbi from '../artifacts/@aave/core-v3/contracts/interfaces/IPool.sol/IPool.json'

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { AaveStrategy } from '../types/contracts/AaveStrategy'

export const getAaveStrategyContract = async () => {
  const AaveStrategy = await ethers.getContractFactory('AaveStrategy')
  return AaveStrategy.attach(AAVE_STRATEGY_ADDRESS) as AaveStrategy
}

export const getTokenContract = (account?: SignerWithAddress) => {
  return new Contract(TOKEN_ADDRESS, ERC20Abi.abi, account)
}

export const getAavePoolContract = (account?: SignerWithAddress) => {
  return new Contract(AAVE_POOL_ADDRESS, AavePoolAbi.abi, account)
}
