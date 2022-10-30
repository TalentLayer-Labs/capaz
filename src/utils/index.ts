export const tokenAddressCTZ = '0x76ce920b752C4a04c1a193dc2EFF9C1A8b018BC6';
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
  { id: 1, name: 'CPZ', address: tokenAddressCTZ, decimals: 6 },
  { id: 2, name: 'USDC', address: '0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43', decimals: 6 },
  { id: 3, name: 'USDT', address: tokenAddressCTZ, decimals: 6 },
  { id: 4, name: 'BUSD', address: tokenAddressCTZ, decimals: 6 },
];
export const tokenAddressEscrowFactory = '0x756E5D754E689BA56c578EaF8eb6B5626479D6B6';
export const tokenAddressUserEscrow = '0x5abDD1519fDa889B48a369506e956Dd1f6A716ff;';

export const truncateAddress = (address: string, length = 5) => {
  return `${address.substring(0, length)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
};
