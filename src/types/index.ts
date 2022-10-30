import { BigNumber } from 'ethers';

export interface Payment {
  sender: `0x${string}`;
  receiver: `0x${string}`;
  tokenAddress: `0x${string}`;
  totalAmount: BigNumber;
  startTime: BigNumber;
  periodDuration: BigNumber;
  periods: BigNumber;
  yieldStrategyId: BigNumber;
  escrowAddress: `0x${string}`;
}
