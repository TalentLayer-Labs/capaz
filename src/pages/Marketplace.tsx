import { useAccount, useProvider } from '@web3modal/react';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useConfig from '../hooks/useConfig';
import CapazEscrowFactory from '../contracts/CapazEscrowFactory.json';
import { Payment, PaymentWithMetadata } from '../types';
import MarketplaceItem from '../components/marketplace/MarketplaceItem';

function Marketplace() {
  const [payments, setPayments] = useState<PaymentWithMetadata[]>([]);

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

      if (totalSupply.toNumber() === 0) return;

      const allPayments: PaymentWithMetadata[] = [];

      const getPaymentInfo = async (tokenId: number) => {
        const escrow: Payment = await contract.getEscrow(tokenId);
        const metadataUri = await contract.tokenURI(tokenId);
        const metadata = await fetch(metadataUri);
        const metadataJson = await metadata.json();
        return { ...escrow, metadata: metadataJson };
      };

      const promises = [...Array(totalSupply.toNumber()).keys()].map((value, index) =>
        getPaymentInfo(index),
      );

      const paymentsWithMetadata = await Promise.all(promises);

      for (const p of paymentsWithMetadata) {
        allPayments.push(p);
      }

      setPayments(allPayments);
    };

    getUserPayments();
  }, [isAccountReady, config, provider, account.address]);

  return (
    <>
      <div>
        <Sidebar />
        <div className='flex flex-1 flex-col md:pl-64'>
          <Header />
          <main>
            {/* Main dashboard's table */}
            <div className='py-6 w-full'>
              <div className='mx-auto xl:w-10/12 px-4 sm:px-6 md:px-8'>
                <h1 className='text-2xl font-semibold text-gray-900'>Marketplace</h1>
              </div>

              <div className='mx-auto xl:w-10/12 px-4 sm:px-6 md:px-8'>
                {payments.map(payment => (
                  <MarketplaceItem key={payment.escrowAddress} payment={payment} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Marketplace;
