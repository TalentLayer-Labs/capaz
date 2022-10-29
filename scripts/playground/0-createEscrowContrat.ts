import { ethers } from 'hardhat'
const hre = require('hardhat')

// We create an CapazEscrowFactory contract
async function main() {
  const [alice, bob, carol, dave] = await ethers.getSigners()

  //Deployed contract addresses
  const capazERC20LocalAddress = '0x48C45A025D154b40AffB41bc3bDEecb689edE7E6'
  const capazEscrowFactoryLocalAddress = '0xA463D7A8DBF8Ca2Ab9dC9D404Fb710527Ac3C3A7'

  // We get an instance of the CapazEscrowFactory contract
  const CapazEscrowFactoryContract = await ethers.getContractAt('CapazEscrowFactory', capazEscrowFactoryLocalAddress)

  // We get an instance of the CapazERC20 contract
  const CapazERC20 = await ethers.getContractAt('CapazERC20', capazERC20LocalAddress)

  // alice send token to Bob
  const aliceTransfer = await CapazERC20.connect(alice).transfer(bob.address, 1000)
  aliceTransfer.wait()

  //Alice and approves CapazEscrowFactory to spend 100 tokens
  const aliceApprove = await CapazERC20.connect(alice).approve(capazEscrowFactoryLocalAddress, 100)
  await aliceApprove.wait()
  const bobApprove = await CapazERC20.connect(bob).approve(capazEscrowFactoryLocalAddress, 100)
  await bobApprove.wait()

  //Escrow will check how many token Alice and Bob gave him permission to spend
  const aliceAllowance = await CapazERC20.allowance(alice.address, capazEscrowFactoryLocalAddress)
  const bobAllowance = await CapazERC20.allowance(bob.address, capazEscrowFactoryLocalAddress)

  // get balance from Alice and Bob Wallet
  const aliceBalance = await CapazERC20.balanceOf(alice.address)
  console.log('Alice Balance: ', aliceBalance.toString())

  const bobBalance = await CapazERC20.balanceOf(bob.address)
  console.log('Bob Balance: ', bobBalance.toString())

  // Escrow will send the allow token in his account
  const aliceMintData = await CapazEscrowFactoryContract.mint({
    sender: alice.address,
    receiver: carol.address,
    tokenAddress: '0x48C45A025D154b40AffB41bc3bDEecb689edE7E6',
    totalAmount: 100,
    startTime: 1668035169,
    periodDuration: 600,
    periods: 10,
    yieldStrategyId: 2,
    escrowAddress: '0x0000000000000000000000000000000000000000',
  })
  aliceMintData.wait()

  // Escrow will send the allow token in his account
  const bobMintData = await CapazEscrowFactoryContract.mint({
    sender: bob.address,
    receiver: dave.address,
    tokenAddress: '0x48C45A025D154b40AffB41bc3bDEecb689edE7E6',
    totalAmount: 100,
    startTime: 1668035169,
    periodDuration: 500,
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
