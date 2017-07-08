import { expect } from 'chai'
import { stub } from 'sinon'
import { mapAsync, mapToString, randomElement, removeValue } from '../'

describe('array', () => {

  it('mapAsync() should map an array', async () => {
    const obj = ['a', 'b']
    const res = await mapAsync(obj, async (v, k) => `${k}:${v}`)
    expect(res).to.deep.equal(['0:a', '1:b'])
  })

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
    expect(a.callCount).to.equal(1)
    expect(b.callCount).to.equal(1)
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

  it('removeValue() should remove an object from an array', () => {
    const a = {}
    const array = [a, {}, {}]
    const res = removeValue(array, a)
    expect(res).to.be.true
    expect(array.length).to.equal(2)
    expect(array.indexOf(a)).to.equal(-1)
  })

  it('removeValue() should only remove the first object from an array', () => {
    const a = {}
    const array = [a, {}, a]
    removeValue(array, a)
    expect(array.length).to.equal(2)
    expect(array[0]).to.not.equal(a)
    expect(array[1]).to.equal(a)
  })

  it('removeValue() should not remove an object that is not in an array', () => {
    const a = {}
    const array = [{}, {}, {}]
    const res = removeValue(array, a)
    expect(res).to.be.false
    expect(array.length).to.equal(3)
  })

})
