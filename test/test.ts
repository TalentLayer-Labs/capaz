import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Useless test', async () => {
  it('work', async () => {
    await ethers.getSigners()
    expect(true).to.equal(true)
  })
})
