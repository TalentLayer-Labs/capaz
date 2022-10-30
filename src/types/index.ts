import { BigNumber } from 'ethers';

export interface Payment {
  sender: string;
  receiver: string;
  tokenAddress: string;
  totalAmount: BigNumber;
  startTime: BigNumber;
  periodDuration: BigNumber;
  periods: BigNumber;
  yieldStrategyId: BigNumber;
  escrowAddress: string;
}
