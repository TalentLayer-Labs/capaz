import { ethers } from 'hardhat'
const hre = require('hardhat')

// We create an CapazEscrowFactory contract
async function main() {
  const [alice, bob, carol, dave] = await ethers.getSigners()

  const CapazEscrowFactoryContract = await ethers.getContractAt(
    'CapazEscrowFactory',
    '0xA463D7A8DBF8Ca2Ab9dC9D404Fb710527Ac3C3A7',
  )

  const CapazCommon = await ethers.getContractAt('CapazCommon', '0x1eC0abD9539638FDb05EeD904Ca6F617BfBD6DCC')
  const capazERC20LocalAddress = '0x48C45A025D154b40AffB41bc3bDEecb689edE7E6'
  const capazEscrowFactoryLocalAddress = '0xA463D7A8DBF8Ca2Ab9dC9D404Fb710527Ac3C3A7'

  //ERC20 token allowance
  const CapazERC20 = await ethers.getContractAt('CapazERC20', capazERC20LocalAddress)

  //Alice approves CapazEscrowFactory to spend 100 tokens
  const approve = await CapazERC20.approve(capazEscrowFactoryLocalAddress, 100)
  await approve.wait()

  //Escrow will check how many token Alice gave him permission to spend
  const allowance = await CapazERC20.allowance(alice.address, capazEscrowFactoryLocalAddress)

  // Escrow will send the allow token in his account
  const mintData = await CapazEscrowFactoryContract.mint({
    sender: alice.address,
    receiver: bob.address,
    tokenAddress: '0x48C45A025D154b40AffB41bc3bDEecb689edE7E6',
    totalAmount: 100,
    startTime: 1668035169,
    periodDuration: 600,
    periods: 10,
    yieldStrategyId: 2,
    escrowAddress: '0x0000000000000000000000000000000000000000',
  })

  console.log(mintData)

  // get Alice balance
  const aliceBalance = await CapazERC20.balanceOf(alice.address)
  console.log(aliceBalance.toString())

  // get Escrow Balance
  const escrowBalance = await CapazERC20.balanceOf(capazEscrowFactoryLocalAddress)
  console.log(escrowBalance.toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
