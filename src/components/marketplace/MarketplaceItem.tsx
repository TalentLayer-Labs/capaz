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
      <a
        target={'_blank'}
        rel={'noreferrer'}
        href={`https://testnets.opensea.io/assets/goerli/0x3f5f310a63ad54256403586f133d578fca80b8fc/${payment.tokenId}`}>
        <span ref={svgContainerRef} />
      </a>
      {/* {token && (
        <>
          {ethers.utils.formatUnits(payment.totalAmount.toString(), token?.decimals)}
          {token?.symbol}
        </>
      )} */}
    </div>
  );
}
