# CAPAZ

## local running commands

-`npx hardhat node`
-`npm run deploy`

Please add the deployed contracts addresses in your .env file

-`npm run zero`(will run the playground script 0-createEscrowContract.ts)
-`npm run one`(will run the playground script 1-claim.ts)

## remote running commands

- Deploy contracts: `npx hardhat run scripts/deploy.ts --network goerli`
- Verify your contract on etherscan: `npx hardhat verify --network goerli <contract network addresses>`


## Deployed
### Deployed contract on Goerli Testnet

- AaveStrategy: `0x9C16ECeeA40C8FdE5Dc5f5318c35E236b692A647`
- CapazEscrowFactory: `0x3f5f310A63AD54256403586f133D578fCa80B8FC`
- CapazERC20: `0xC379309351099bAeEd4467b7a20eBA88eae42c09`

### Deployed contract on Cronons Testnet

- AaveStrategy: `0x00F55088c15b9bF75e6a19699fA2b32FB1388126`
- CapazEscrowFactory: `0x2eD3f237aEa7624669aa6AF363f1b1CC67772931`
- CapazERC20: `0x962F2585Da1B901CAB10ab447f8cb40Cc15b3197`

### Deployed contract on Mumbai

- AaveStrategy: `0x3220A910e4a2e437c2A1a5bb8799ff1143E144F0`
- CapazEscrowFactory: `0x48C45A025D154b40AffB41bc3bDEecb689edE7E6`
- CapazWETHAdapter: `0xdA1DA2364707Bdd242be34b9D8c2D8cf504B52f4`
- capazERC20: `0x5B5C32217dc6c13828F75221949fC6D1Bd6C6A08`
