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
        className='rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold'
        onClick={handleClick}>
        Claim
      </button>
    </div>
  );
}

export default ClaimButton;
