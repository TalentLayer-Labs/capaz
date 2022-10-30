import { useContractRead } from '@web3modal/react';
import CapazEscrow from '../contracts/CapazEscrow.json';

function ReleasableAmount({ escrowAddress }: { escrowAddress: string }) {
  const { data, error, isLoading, refetch } = useContractRead({
    address: escrowAddress,
    abi: CapazEscrow.abi,
    functionName: 'releasableAmount',
  });

  if (isLoading) {
    return <span>'Loading...'</span>;
  }

  if (error) {
    console.error(error?.error?.message);
  }

  return <span>{data?.toString()}</span>;
}

export default ReleasableAmount;
