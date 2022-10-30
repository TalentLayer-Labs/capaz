import { Payment } from '../types';
import { ethers } from 'ethers';
import { formatDate } from '../utils/dates';
import ClaimButton from './ClaimButton';
import ReleasableAmount from './ReleasableAmount';
import DistributeYieldButton from './DistributeYieldButton';
import { useAccount, useContractRead } from '@web3modal/react';
import { periodDuration, yieldStrategy } from '../utils';
import { useToken } from '@web3modal/react';
import CapazEscrow from '../contracts/CapazEscrow.json';

function getPeriodName(seconds: number) {
  for (const period of periodDuration) {
    if (seconds < period.value) return period.name + 's';
  }

  return 'years';
}

function getStrategyName(strategyId: number) {
  return yieldStrategy.find(strategy => strategy.id === strategyId)?.name;
}

function getStatus(payment: Payment): string {
  if (
    payment.startTime.add(payment.periodDuration.mul(payment.periods)).toNumber() >
    Date.now() / 1000
  ) {
    return 'Finished';
  }

  return 'Active';
}

function PaymentRow({ payment }: { payment: Payment }) {
  const { account, isReady } = useAccount();
  const { data: token } = useToken({
    address: payment.tokenAddress,
  });

  const {
    data: releasableAmount,
    error,
    isLoading,
    refetch,
  } = useContractRead({
    address: payment.escrowAddress,
    abi: CapazEscrow.abi,
    functionName: 'releasableAmount',
  });

  const status = getStatus(payment);

  return (
    <tr className={status == 'Finished' ? 'opacity-30' : ''}>
      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 '>
        <span
          className={`px-2.5 py-1.5 text-xs font-medium text-white ${
            status == 'Active' ? 'bg-indigo-600 ' : 'bg-rose-600 '
          }`}>
          {status}
        </span>
      </th>
      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 '>
        {token?.symbol}
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
        {releasableAmount?.toString() || ''}
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        {payment.receiver == account.address && releasableAmount?.toNumber() > 0 && (
          <ClaimButton escrowAddress={payment.escrowAddress} />
        )}
        {payment.sender == account.address &&
          payment.yieldStrategyId.toNumber() > 0 &&
          status == 'Finished' && <DistributeYieldButton escrowAddress={payment.escrowAddress} />}
      </td>
    </tr>
  );
}

export default PaymentRow;
