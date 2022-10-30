import { useContractWrite } from '@web3modal/react';
import CapazEscrow from '../contracts/CapazEscrow.json';

function ClaimButton({ escrowAddress }: { escrowAddress: string }) {
  const { data, error, isLoading, write } = useContractWrite({
    address: escrowAddress,
    abi: CapazEscrow.abi,
    functionName: 'release',
  });

  async function handleClick() {
    write();
  }

  if (error) {
    console.error(error?.error?.message);
  }

  return (
    <div className='flex justify-center my-6'>
      <button
        className='className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        onClick={handleClick}>
        Claim
      </button>
    </div>
  );
}

export default ClaimButton;
