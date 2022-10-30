export enum Network {
  LOCAL = 0,
  MAINNET = 1,
  GOERLI = 5,
  CRONOSTESTNET = 338,
  MUMBAI = 80001,
}

export type Config = {
  networkId: Network;
  escrowFactoryAddress: string;
};

export const maxDecimals = {
  ETH: 2,
};

const mainnet = {
  networkId: Network.MAINNET,
  escrowFactoryAddress: '0x6FD4EB990eD2E7bb2b1203E7f728e29904A4d5A4',
};

const goerli = {
  networkId: Network.GOERLI,
  escrowFactoryAddress: '0x20c1Dec4ca935c5848B0F8Ea963713d8F3594c02',
};

const local = {
  networkId: Network.LOCAL,
  escrowFactoryAddress: '0x6FD4EB990eD2E7bb2b1203E7f728e29904A4d5A4',
};

const cronostestnet = {
  networkId: Network.CRONOSTESTNET,
  escrowFactoryAddress: '0x2eD3f237aEa7624669aa6AF363f1b1CC67772931',
};

const mumbai = {
  networkId: Network.MUMBAI,
  escrowFactoryAddress: '0x48C45A025D154b40AffB41bc3bDEecb689edE7E6',
};

const chains: { [networkId in Network]: Config } = {
  [Network.LOCAL]: local,
  [Network.MAINNET]: mainnet,
  [Network.GOERLI]: goerli,
  [Network.CRONOSTESTNET]: cronostestnet,
  [Network.MUMBAI]: mumbai,
};

export const getConfig = (network: Network) => {
  return chains[network];
};
