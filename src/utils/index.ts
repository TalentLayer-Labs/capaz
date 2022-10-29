export const tokenAddressCTZ = '0x76ce920b752C4a04c1a193dc2EFF9C1A8b018BC6';
export const tokenAddressEscrowFactory = '0x756E5D754E689BA56c578EaF8eb6B5626479D6B6';
export const periodDuration = [
  { id: 1, name: 'second', value: 1 },
  { id: 2, name: 'minute', value: 60 },
  { id: 3, name: 'hour', value: 3600 },
  { id: 4, name: 'day', value: 3600 * 12 },
  { id: 5, name: 'week', value: 3600 * 12 * 7 },
  { id: 6, name: 'month', value: 3600 * 12 * 30 },
  { id: 7, name: 'year', value: 3600 * 12 * 365 },
];
export const yieldStrategy = [
  { id: 0, name: 'None', apy: 0.0 },
  { id: 1, name: 'Aave', apy: 5.43 },
];
export const tokens = [
  { id: 1, name: 'CPZ', address: tokenAddressCTZ },
  { id: 2, name: 'USDC', address: tokenAddressCTZ },
  { id: 3, name: 'USDT', address: tokenAddressCTZ },
  { id: 4, name: 'BUSD', address: tokenAddressCTZ },
];

export const truncateAddress = (address: string, length = 5) => {
  return `${address.substring(0, length)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
};
