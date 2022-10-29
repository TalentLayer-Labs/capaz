import * as React from 'react';
import { usePrepareContractWrite } from 'wagmi';

export function MintNFTForm() {
  const [tokenId, setTokenId] = React.useState('');

  return (
    <form>
      <label for='tokenId'>Token ID</label>
      <input
        id='tokenId'
        onChange={e => setTokenId(e.target.value)}
        placeholder='420'
        value={tokenId}
      />
      <button>Mint</button>
    </form>
  );
}
