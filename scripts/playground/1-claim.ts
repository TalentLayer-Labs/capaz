import { ethers } from 'hardhat'
const hre = require('hardhat')

// We create an CapazEscrowFactory contract
async function main() {
  const [alice, bob, carol, dave] = await ethers.getSigners()

  //Deployed contract addresses
  const capazERC20LocalAddress = '0x1eC0abD9539638FDb05EeD904Ca6F617BfBD6DCC'
  const capazEscrowFactoryLocalAddress = '0xA463D7A8DBF8Ca2Ab9dC9D404Fb710527Ac3C3A7'

  // We get an instance of the CapazEscrowFactory contract
  const CapazEscrowFactoryContract = await ethers.getContractAt('CapazEscrowFactory', capazEscrowFactoryLocalAddress)

  // We get an instance of the CapazERC20 contract
  const CapazERC20 = await ethers.getContractAt('CapazERC20', capazERC20LocalAddress)

  // We ll find the Carol and Dave escrow contract address
  const carolEscrowConfiguration = await CapazEscrowFactoryContract.getEscrow(0)
  const carolEscrowContractaddress = carolEscrowConfiguration.escrowAddress
  console.log(carolEscrowContractaddress)

  const daveEscrowConfiguration = await CapazEscrowFactoryContract.getEscrow(1)
  const daveEscrowContractaddress = daveEscrowConfiguration.escrowAddress
  console.log(daveEscrowContractaddress)

  // Let's find the whole contract instance attached to tgis address
  const EscrowInstance = await ethers.getContractFactory('CapazEscrow')
  const carolEscrowContract = EscrowInstance.attach(carolEscrowContractaddress).connect(carol)
  // console.log(carolEscrowContract)

  // Carol balance account before claim
  const carolBalanceBeforeClaim = await CapazERC20.balanceOf(carol.address)
  console.log('Carol balance before claim: ', carolBalanceBeforeClaim)

  // find how much they can claim
  //!WARNING releasableAmount dont work
  // const carolClaimable = await carolEscrowContract.releasableAmount()
  // console.log('Carol claimable: ', carolClaimable)

  // Release tokens
  // const releaseTx = await carolEscrowContract.release()
  // await releaseTx.wait()

  // Carol balance account after claim
  // const carolBalanceafterClaim = await CapazERC20.balanceOf(carol.address)
  // console.log('Carol balance before claim: ', carolBalanceafterClaim)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
