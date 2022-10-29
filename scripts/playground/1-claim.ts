import { ethers } from 'hardhat'
const hre = require('hardhat')

// We create an CapazEscrowFactory contract
async function main() {
  const [alice, bob, carol, dave] = await ethers.getSigners()

  //Deployed contract addresses
  const capazERC20LocalAddress = process.env.CAPAZ_ERC20_ADDRESS!
  const capazEscrowFactoryLocalAddress = process.env.CAPAZ_ESCROW_FACTORY_ADDRESS!

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

  // suppose the current block has a timestamp of 01:00 PM
  await hre.network.provider.send('evm_increaseTime', [3000])
  await hre.network.provider.send('evm_mine') // this one will

  // find how much they can claim

  const carolClaimable = await carolEscrowContract.releasableAmount()
  console.log('Carol claimable: ', carolClaimable)

  // if Carol claim > 0 then claim
  if (carolClaimable > 0) {
    // Release tokens
    const releaseTx = await carolEscrowContract.release()
    await releaseTx.wait()
  }

  // Carol balance account after claim
  const carolBalanceafterClaim = await CapazERC20.balanceOf(carol.address)
  console.log('Carol after  claim: ', carolBalanceafterClaim)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
