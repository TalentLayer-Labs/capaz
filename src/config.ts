export enum Network {
  LOCAL = 0,
  MAINNET = 1,
  GOERLI = 5,
}

export interface Token {
  name: string;
  address: string;
  decimals: number;
}

export type Config = {
  networkId: Network;
  escrowFactoryAddress: string;
  tokens: Token[];
};

export const maxDecimals = {
  ETH: 2,
};

const mainnet: Config = {
  networkId: Network.MAINNET,
  escrowFactoryAddress: '0x6FD4EB990eD2E7bb2b1203E7f728e29904A4d5A4',
  tokens: [],
};

const goerli: Config = {
  networkId: Network.GOERLI,
  escrowFactoryAddress: '0x20c1Dec4ca935c5848B0F8Ea963713d8F3594c02',
  tokens: [
    {
      name: 'USDC',
      address: '0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43',
      decimals: 6,
    },
    {
      name: 'USDt',
      address: '0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49',
      decimals: 6,
    },
  ],
};

const local = {
  networkId: Network.LOCAL,
  escrowFactoryAddress: '0x6FD4EB990eD2E7bb2b1203E7f728e29904A4d5A4',
  tokens: [],
};

const chains: { [networkId in Network]: Config } = {
  [Network.LOCAL]: local,
  [Network.MAINNET]: mainnet,
  [Network.GOERLI]: goerli,
};

export const getConfig = (network: Network) => {
  return chains[network];
};
