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

  // get the wallet alice balance
  let aliceBalance = await CapazERC20.balanceOf(alice.address)
  console.log('Alice balance: ', aliceBalance)

  //Alice approves CapazEscrowFactory to spend 100 tokens
  const aliceApprove = await CapazERC20.connect(alice).approve(
    capazEscrowFactoryLocalAddress,
    ethers.utils.parseEther('10'),
  )
  await aliceApprove.wait()

  //Escrow will check how many token Alice and Bob gave him permission to spend
  const aliceAllowance = await CapazERC20.allowance(alice.address, capazEscrowFactoryLocalAddress)
  console.log('Alice allowance: ', aliceAllowance.toString())

  // get balance from Alice wallet
  aliceBalance = await CapazERC20.balanceOf(alice.address)
  console.log('Alice Balance: ', aliceBalance.toString())

  const startTime = Math.floor(new Date().getTime() / 1000 + 20) // now + 20 seconds
  const amount = ethers.utils.parseEther('0.1')

  // We mint a new escrow contract from CapazEscrowFactory
  const aliceMintData = await CapazEscrowFactoryContract.mint({
    sender: alice.address,
    receiver: carol.address,
    tokenAddress: '0x48C45A025D154b40AffB41bc3bDEecb689edE7E6',
    totalAmount: amount,
    startTime,
    periodDuration: 5,
    periods: 2,
    yieldStrategyId: 2,
    escrowAddress: '0x0000000000000000000000000000000000000000',
  })
  aliceMintData.wait()

  // We get the escrow data from the id to check if we get the right data
  const getCarolMintedNumber = await CapazEscrowFactoryContract.balanceOf(carol.address)
  console.log('Carol NFT number', getCarolMintedNumber)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
