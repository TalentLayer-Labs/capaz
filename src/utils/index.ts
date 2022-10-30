export const periodDuration = [
  { id: 1, name: 'second', value: 1 },
  { id: 2, name: 'minute', value: 60 },
  { id: 3, name: 'hour', value: 3600 },
  { id: 4, name: 'day', value: 3600 * 24 },
  { id: 5, name: 'week', value: 3600 * 24 * 7 },
  { id: 6, name: 'month', value: 3600 * 24 * 30 },
  { id: 7, name: 'year', value: 3600 * 24 * 365 },
];
export const yieldStrategy = [
  { id: 0, name: 'None', apy: 0.0 },
  { id: 1, name: 'Aave', apy: 5.43 },
];
export const tokens = [
  { id: 1, name: 'CPZ', address: '0x76ce920b752C4a04c1a193dc2EFF9C1A8b018BC6', decimals: 18 },
  { id: 2, name: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
  { id: 3, name: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6 },
  { id: 4, name: 'BUSD', address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53', decimals: 6 },
];
export const tokenAddressEscrowFactory = '0x756E5D754E689BA56c578EaF8eb6B5626479D6B6';
export const tokenAddressUserEscrow = '0x5abDD1519fDa889B48a369506e956Dd1f6A716ff;';

export const truncateAddress = (address: string, length = 5) => {
  return `${address.substring(0, length)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
};
