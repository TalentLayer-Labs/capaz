# CAPAZ

## Contracts addresses on Goerli

CapazEscrowFactory deployed to: 0xA351475E163533213e261f58e4840B59Da3A3b5B

capazERC20 deployed to: 0xA45EB729A770cB09Fd943078811D8748dABa3D95

## local running commands

-`npx hardhat node`

-`npm run deploy`

Please add the deployed contracts addresses in your .env file

-`npm run zero`(will run the playground script 0-createEscrowContract.ts)

-`npm run one`(will run the playground script 1-claim.ts)

## Verify your contract on etherscan

`npx hardhat verify --network goerli <contract network addresses>`

# Deployed contract on Cronons Testnet

AaveStrategy deployed Cronos Testnet: 0x00F55088c15b9bF75e6a19699fA2b32FB1388126
CapazEscrowFactory deployed on Cronos: 0x2eD3f237aEa7624669aa6AF363f1b1CC67772931
CapazERC20 deployed on Cronos Testnet: 0x962F2585Da1B901CAB10ab447f8cb40Cc15b3197
