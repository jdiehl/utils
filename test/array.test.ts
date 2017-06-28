import { expect } from 'chai'
import { stub } from 'sinon'
import { mapToString, randomElement } from '../'

describe('array', () => {

  it('mapToString() should map an array of numbers to strings', () => {
    const array = [0, 1, 2]
    const res = mapToString(array)
    expect(res).to.deep.equal(['0', '1', '2'])
  })

  it('mapToString() should call toString() on an object of an array', () => {
    const a = stub().returns('a')
    const b = stub().returns('b')
    const array = [{ toString: a }, { toString: b }]
    const res = mapToString(array)
    expect(res).to.deep.equal(['a', 'b'])
    expect(a.called).to.be.true
    expect(b.called).to.be.true
  })

  it('randomElement() should return the only element of an array', () => {
    const array = ['a']
    const res = randomElement(array)
    expect(res).to.equal('a')
  })

  it('randomElement() should return an element of an array', () => {
    const array = [{}, {}, {}]
    const res = randomElement(array)
    expect(array.indexOf(res)).to.be.gte(0)
  })

  it('randomElement() should return undefined given an empty array', () => {
    const array: void[] = []
    const res = randomElement(array)
    expect(res).to.be.undefined
  })

})
