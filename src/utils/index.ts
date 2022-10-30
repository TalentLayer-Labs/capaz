export const tokenAddressCTZ = '0x76ce920b752C4a04c1a193dc2EFF9C1A8b018BC6';
export const tokenAddressEscrowFactory = '0x756E5D754E689BA56c578EaF8eb6B5626479D6B6';
export const tokenAddressUserEscrow = '0x5abDD1519fDa889B48a369506e956Dd1f6A716ff;';

export const truncateAddress = (address: string, length = 5) => {
  return `${address.substring(0, length)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
};
