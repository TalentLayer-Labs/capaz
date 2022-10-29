import { useContractRead, useNetwork, useSwitchNetwork } from '@web3modal/react';
import useConfig from '../hooks/useConfig';
import CapazEscrowFactory from '../contracts/CapazEscrowFactory.json';

function PaymentRow({ tokenId }: { tokenId: number }) {
  const config = useConfig();
  const { data, error, isLoading, refetch } = useContractRead({
    address: config?.escrowFactoryAddress || '',
    abi: CapazEscrowFactory.abi,
    functionName: 'getEscrow',
    args: [tokenId],
    enabled: !!config?.escrowFactoryAddress,
  });

  return (
    <tr>
      <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 '>
        USDC
      </th>
      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
        500$
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        28 oct
      </td>
      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        <i className='fas fa-arrow-up text-emerald-500 mr-4'></i>5
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        weeks
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        Aave
      </td>
      <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
        -
      </td>
    </tr>
  );
}

export default PaymentRow;
