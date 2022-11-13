import { Payment } from '../types';
import { BigNumber, ethers } from 'ethers';
import { formatDate } from '../utils/dates';
import ClaimButton from './ClaimButton';
import DistributeYieldButton from './DistributeYieldButton';
import { periodDuration, truncateAddress, yieldStrategy } from '../utils';
import { useAccount, useToken, useContractRead } from '@web3modal/react';
import CapazEscrow from '../contracts/CapazEscrow.json';

function getPeriodName(seconds: number) {
  for (const period of periodDuration) {
    if (seconds <= period.value) return period.name + 's';
  }

  return 'years';
}

function getStrategyName(strategyId: number) {
  return yieldStrategy.find(strategy => strategy.id === strategyId)?.name;
}

function getStatus(payment: Payment): string {
  if (
    payment.startTime.add(payment.periodDuration.mul(payment.periods)).toNumber() <
    Date.now() / 1000
  ) {
    return 'Finished';
  }

  return 'Active';
}

function PaymentRow({ payment }: { payment: Payment }) {
  const { account } = useAccount();
  const { data: token } = useToken({
    address: payment.tokenAddress,
  });

  const { data: releasableAmount } = useContractRead({
    address: payment.escrowAddress,
    abi: CapazEscrow.abi,
    functionName: 'releasableAmount',
  });

  const status = getStatus(payment);

  const releasableAmountNum = releasableAmount as BigNumber | undefined;

  return (
    <tr style={{ height: '78px', borderBottom: '1px solid #dddddd' }}>
      <td className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 '>
        {payment.sender === account.address ? (
          <span className='text-red-500'>Out</span>
        ) : (
          <span className='text-green-500'>In</span>
        )}
      </td>
      <td className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 '>
        <span
          className={`px-2.5 py-1.5 text-xs font-medium text-white ${
            status == 'Active' ? 'bg-indigo-600 ' : 'bg-rose-600 '
          }`}>
          {status}
        </span>
      </td>
      <td className='text-xs'>
        {payment.sender === account.address
          ? truncateAddress(payment.receiver)
          : truncateAddress(payment.sender)}
      </td>
      <td className='border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-3'>
        {formatDate(payment.startTime.toNumber() * 1000)}
      </td>
      <td className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 '>
        {ethers.utils.formatUnits(payment.totalAmount.toString(), token?.decimals)} {token?.symbol}
      </td>
      <td className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3'>
        {payment.periods.toNumber()} times every {getPeriodName(payment.periodDuration.toNumber())}
      </td>
      <td className='border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-3'>
        {getStrategyName(payment.yieldStrategyId.toNumber())}
      </td>
      <td className='border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-3'>
        {releasableAmountNum &&
          token &&
          ethers.utils.formatUnits(releasableAmountNum?.toString(), token?.decimals)}
        {token?.symbol}
      </td>
      <td className='border-t-0 px-4 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-3'>
        {payment.receiver == account.address && (releasableAmount as BigNumber)?.gt(0) && (
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
