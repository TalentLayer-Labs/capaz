import { useAccount, useContractWrite } from '@web3modal/react';
import CapazEscrow from '../contracts/CapazEscrow.json';

function DistributeYieldButton({ escrowAddress }: { escrowAddress: string }) {
  const { account } = useAccount();
  const { error, write } = useContractWrite({
    address: escrowAddress,
    abi: CapazEscrow.abi,
    functionName: 'distributeYield',
    args: [account.address, account.address],
  });

  async function handleClick() {
    write();
  }

  if (error) {
    console.error(error?.message);
  }

  return (
    <div className='flex justify-center my-6'>
      <button
        className='className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        onClick={handleClick}>
        Distribute yield
      </button>
    </div>
  );
}

export default DistributeYieldButton;
