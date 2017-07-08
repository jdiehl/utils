import { expect } from 'chai'

import { stringToDuration } from '../'

describe('date', () => {

  it('stringToDuration() should transform durations', () => {
    expect(stringToDuration('2s')).to.equal(2 * 1000)
    expect(stringToDuration('3m')).to.equal(3 * 60 * 1000)
    expect(stringToDuration('4h')).to.equal(4 * 60 * 60 * 1000)
    expect(stringToDuration('5d')).to.equal(5 * 24 * 60 * 60 * 1000)
    expect(stringToDuration('6w')).to.equal(6 * 7 * 24 * 60 * 60 * 1000)
    expect(stringToDuration('8y')).to.equal(8 * 365 * 24 * 60 * 60 * 1000)
  })

})
