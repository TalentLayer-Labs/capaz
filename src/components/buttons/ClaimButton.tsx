
import { useContractWrite, useToken } from '@web3modal/react';
import CapazEscrow from '../../contracts/CapazEscrow.json';
import { tokenAddressUserEscrow } from "../../utils/index";

function ClaimButton() {
    const {data, error, isLoading,write} = useContractWrite({
        address: tokenAddressUserEscrow,
        abi: CapazEscrow.abi,
        functionName: 'release',
      });

      async function handleClick() {
        write();
        
      }

      console.log(data, error, isLoading);
    

    return (
        <div className='flex justify-center my-6'>
        <button
          className='rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold'
          onClick={handleClick}
        >
          Claim
        </button>
      </div>
    );
  }
  

  export default ClaimButton