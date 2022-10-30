import { useToken } from '@web3modal/react';
import { ethers } from 'ethers';
import { useEffect, useRef } from 'react';
import { PaymentWithMetadata } from '../../types';

export default function MarketplaceItem({ payment }: { payment: PaymentWithMetadata }) {
  const { data: token } = useToken({
    address: payment.tokenAddress,
  });

  const svgContainerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!svgContainerRef.current || !token) return;

    const base64 = payment.metadata.image.replace('data:image/svg+xml;base64,', '');
    console.log(base64);
    const svgString = atob(base64);

    const formattedAmount = ethers.utils.formatUnits(payment.totalAmount, token?.decimals);
    const updatedSvgString = svgString.replace(payment.totalAmount.toString(), formattedAmount);

    svgContainerRef.current.innerHTML = updatedSvgString;
  }, [token]);

  return (
    <div className='flex flex-col'>
      <span ref={svgContainerRef} />
      {/* {token && (
        <>
          {ethers.utils.formatUnits(payment.totalAmount.toString(), token?.decimals)}
          {token?.symbol}
        </>
      )} */}
    </div>
  );
}
