import { useContractRead } from '@web3modal/react';
import CapazEscrowFactory from '../contracts/CapazEscrowFactory.json';

function ReleasableAmount({ escrowAddress }: { escrowAddress: string }) {
  const { data, error, isLoading, refetch } = useContractRead({
    address: escrowAddress,
    abi: CapazEscrowFactory.abi,
    functionName: 'releasableAmount',
  });

  if (isLoading) {
    return <p>'Loading...'</p>;
  }

  console.log(data, error);

  return <p>'data:'</p>;
}

export default ReleasableAmount;
