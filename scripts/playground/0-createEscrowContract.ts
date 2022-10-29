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

  // get the wallet alice balance
  let aliceBalance = await CapazERC20.balanceOf(alice.address)
  console.log('Alice balance: ', aliceBalance)

  // alice send token to Bob
  const aliceTransfer = await CapazERC20.connect(alice).transfer(bob.address, ethers.utils.parseEther('10'))
  aliceTransfer.wait()
  // get the wallet bob balance
  let bobBalance = await CapazERC20.balanceOf(bob.address)
  console.log('Bob balance: ', bobBalance)

  //Alice and approves CapazEscrowFactory to spend 100 tokens
  const aliceApprove = await CapazERC20.connect(alice).approve(
    capazEscrowFactoryLocalAddress,
    ethers.utils.parseEther('1'),
  )
  await aliceApprove.wait()

  const bobApprove = await CapazERC20.connect(bob).approve(capazEscrowFactoryLocalAddress, ethers.utils.parseEther('1'))
  await bobApprove.wait()

  //Escrow will check how many token Alice and Bob gave him permission to spend
  const aliceAllowance = await CapazERC20.allowance(alice.address, capazEscrowFactoryLocalAddress)
  console.log('Alice allowance: ', aliceAllowance.toString())

  const bobAllowance = await CapazERC20.allowance(bob.address, capazEscrowFactoryLocalAddress)
  console.log('Bob allowance: ', bobAllowance.toString())

  // get balance from Alice and Bob Wallet
  aliceBalance = await CapazERC20.balanceOf(alice.address)
  console.log('Alice Balance: ', aliceBalance.toString())

  bobBalance = await CapazERC20.balanceOf(bob.address)
  console.log('Bob Balance: ', bobBalance.toString())

  const startTime = Math.floor(new Date().getTime() / 1000 + 20) // now + 20 seconds
  console.log('Start time: ', startTime)

  const amount = ethers.utils.parseEther('0.2')
  console.log('Amount: ', amount.toString())

  // We mint a new escrow contract from CapazEscrowFactory
  const aliceMintData = await CapazEscrowFactoryContract.mint({
    sender: alice.address,
    receiver: carol.address,
    tokenAddress: process.env.CAPAZ_ERC20_ADDRESS,
    totalAmount: amount,
    startTime,
    periodDuration: 3600,
    periods: 5,
    yieldStrategyId: 2,
    escrowAddress: '0x0000000000000000000000000000000000000000',
  })
  aliceMintData.wait()

  // We mint a new escrow contract from CapazEscrowFactory
  const bobMintData = await CapazEscrowFactoryContract.mint({
    sender: bob.address,
    receiver: dave.address,
    tokenAddress: process.env.CAPAZ_ERC20_ADDRESS,
    totalAmount: amount,
    startTime,
    periodDuration: 10,
    periods: 5,
    yieldStrategyId: 3,
    escrowAddress: '0x0000000000000000000000000000000000000000',
  })
  bobMintData.wait()

  // We get the escrow data from the id to check if we get the right data
  const getCarolMintedNumber = await CapazEscrowFactoryContract.balanceOf(carol.address)
  console.log('Carol NFT number', getCarolMintedNumber)

  const getDaveEscrowData = await CapazEscrowFactoryContract.balanceOf(dave.address)
  console.log('Dave NFT number', getDaveEscrowData)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
