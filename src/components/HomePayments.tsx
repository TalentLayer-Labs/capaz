import PaymentRow from './PaymentRow';
import { useAccount, useProvider } from '@web3modal/react';
import CapazEscrowFactory from '../contracts/CapazEscrowFactory.json';
import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { Payment } from '../types';
import useConfig from '../hooks/useConfig';

export default function HomePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  const config = useConfig();

  const { account, isReady: isAccountReady } = useAccount();
  const { provider } = useProvider();

  useEffect(() => {
    if (!isAccountReady || !config) return;

    const getUserPayments = async () => {
      const contract = new ethers.Contract(
        config.escrowFactoryAddress,
        CapazEscrowFactory.abi,
        provider,
      );

      const totalSupply: BigNumber = await contract.totalSupply();

      const userPayments: Payment[] = [];

      for (let tokenId = 0; tokenId < totalSupply.toNumber(); tokenId++) {
        const escrow: Payment = await contract.getEscrow(tokenId);
        const sender = escrow.sender.toLowerCase();
        const receiver = escrow.receiver.toLowerCase();

        if (
          sender === account.address.toLowerCase() ||
          receiver === account.address.toLowerCase()
        ) {
          userPayments.push(escrow);
        }
      }

      setPayments(userPayments);
    };

    getUserPayments();
  }, [isAccountReady, config, provider, account]);

  return (
    <main>
      {/* Main dashboard's table */}
      <div className='py-6 w-full'>
        <div className='mx-auto xl:w-8/12 px-4 sm:px-6 md:px-8'>
          <h1 className='text-2xl font-semibold text-gray-900'>Your payments</h1>
        </div>

        <div className='mx-auto px-4 sm:px-6 md:px-8'>
          <div className='py-4'>
            <div className='w-full xl:w-8/12 mb-12 xl:mb-0 mx-auto mt-6'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded '>
                <div className='block w-full overflow-x-auto'>
                  <table className='items-center bg-transparent w-full border-collapse '>
                    <thead>
                      <tr>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Asset
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Total
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Start at
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Payed In
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Every
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Yield
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          More
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {payments.map(payment => (
                        <PaymentRow payment={payment} key={payment.escrowAddress} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
