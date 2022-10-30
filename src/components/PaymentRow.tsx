import { Payment } from '../types';
import { ethers } from 'ethers';
import { formatDate } from '../utils/dates';
import ClaimButton from './ClaimButton';
import ReleasableAmount from './ReleasableAmount';
import DistributeYieldButton from './DistributeYieldButton';
import { periodDuration, yieldStrategy } from '../utils';
import { useAccount, useToken } from '@web3modal/react';

function getPeriodName(seconds: number) {
  for (const period of periodDuration) {
    if (seconds <= period.value) return period.name + 's';
  }

  return 'years';
}

function getStrategyName(strategyId: number) {
  return yieldStrategy.find(strategy => strategy.id === strategyId)?.name;
}

function PaymentRow({ payment }: { payment: Payment }) {
  const { account } = useAccount();
  const { data } = useToken({
    address: payment.tokenAddress,
  });

  return (
    <tr>
      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 '>
        {payment.sender === account.address ? (
          <span className='text-red-500'>Outflow</span>
        ) : (
          <span className='text-green-500'>Inflow</span>
        )}
      </th>
      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 '>
        {data?.symbol}
      </th>
      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
        {ethers.utils.formatUnits(payment.totalAmount.toString(), 6)}
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        {formatDate(payment.startTime.toNumber() * 1000)}
      </td>
      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        {payment.periods.toNumber()}
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        {getPeriodName(payment.periodDuration.toNumber())}
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        {getStrategyName(payment.yieldStrategyId.toNumber())}
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        <ReleasableAmount escrowAddress={payment.escrowAddress} />
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        {payment.receiver == account.address && (
          <ClaimButton escrowAddress={payment.escrowAddress} />
        )}
        {payment.sender == account.address && payment.yieldStrategyId.toNumber() > 0 && (
          <DistributeYieldButton escrowAddress={payment.escrowAddress} />
        )}
      </td>
    </tr>
  );
}

export default PaymentRow;
