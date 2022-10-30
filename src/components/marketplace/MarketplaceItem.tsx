import { useToken } from '@web3modal/react';
import { ethers } from 'ethers';
import { PaymentWithMetadata } from '../../types';

export default function MarketplaceItem({ payment }: { payment: PaymentWithMetadata }) {
  const { data: token } = useToken({
    address: payment.tokenAddress,
  });

  return (
    <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white'>
      {token && (
        <>
          {ethers.utils.formatUnits(payment.totalAmount.toString(), token?.decimals)}
          {token?.symbol}
        </>
      )}
      <img src={payment.metadata.image} alt='' />
    </div>
  );
}
