import { expect } from 'chai'
import { randomInt, within } from '../'

describe('number', () => {

  it('randomInt() should generate an integer', () => {
    const x = randomInt(0, 100)
    expect(x).to.be.a('number')
    expect(x.toString()).to.not.contain('.')
  })

  it('randomInt() should generate a number within the limits', () => {
    for (let i = 0; i < 100; i++) {
      const x = randomInt(3, 1)
      expect(x).to.be.gte(3)
      expect(x).to.be.lte(4)
    }
  })

  it('within() should return the correct result', () => {
    expect(within(5, 0, 10)).to.equal(5)
    expect(within(-1, 0, 10)).to.equal(0)
    expect(within(11, 0, 10)).to.equal(10)
    expect(within(3, -5, -3)).to.equal(-3)
    expect(within(0, 0, 0)).to.equal(0)
  })

})
