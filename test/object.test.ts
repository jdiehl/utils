import { expect } from 'chai'
import { spy, stub } from 'sinon'
import { clone, each, eachAsync, equals, extend, makeIndex, removeObject, setOrRemove } from '../'

describe('object', () => {

  it('clone() should return a simple type', () => {
    expect(clone(3)).to.equal(3)
    expect(clone('a')).to.equal('a')
  })

  it('clone() should create a clone of an object', () => {
    const a = {}
    const x = clone(a)
    expect(x).to.not.equal(a)
    expect(x).to.deep.equal(a)
  })

  it('clone() should create a deep clone of an object', () => {
    const a = {}
    const b = { a }
    const x = clone(b)
    expect(x.a).to.not.equal(a)
    expect(x.a).to.deep.equal(a)
  })

  it('clone() should create a clone of an array', () => {
    const a = [1, 2, 3]
    const x = clone(a)
    expect(x).to.not.equal(a)
    expect(x).to.deep.equal(a)
  })

  it('clone() should create a clone of a date object', () => {
    const a = new Date()
    const x = clone(a)
    expect(x).to.not.equal(a)
    expect(x.getTime()).to.equal(a.getTime())
  })

  it('each() should iterate over an object', () => {
    const iterator = spy()
    const obj = { a: 1, b: 2 }
    each(obj, iterator)
    expect(iterator.callCount).to.equal(2)
    expect(iterator.calledWith(1, 'a')).to.be.true
    expect(iterator.calledWith(2, 'b')).to.be.true
  })

  it('each() should cancel iteration upon request', () => {
    const iterator = stub().returns(false)
    const obj = { a: 1, b: 2 }
    each(obj, iterator)
    expect(iterator.callCount).to.equal(1)
    expect(iterator.calledWith(1, 'a')).to.be.true
    expect(iterator.calledWith(2, 'b')).to.be.false
  })

  it('eachAsync() should iterate over an object', async () => {
    const promise = stub().yields()
    const iterator = stub().returns({ then: promise })
    const obj = { a: 1, b: 2 }
    await eachAsync(obj, iterator)
    expect(iterator.callCount).to.equal(2)
    expect(iterator.calledWith(1, 'a')).to.be.true
    expect(iterator.calledWith(2, 'b')).to.be.true
    expect(promise.callCount).to.equal(2)
  })

  it('equals() should return correct results', async () => {
    expect(equals(0, 0)).to.be.true
    expect(equals(0, 1)).to.be.false
    expect(equals({ a: 1 }, { a: 1 })).to.be.true
    expect(equals({ a: 1 }, { a: 2 })).to.be.false
    expect(equals([0, 1], [0, 1])).to.be.true
    expect(equals([0, 1], [0, 2])).to.be.false
  })

  it('extend() should extend an array', () => {
    const x = extend({ a: 1 }, { b: 2 })
    expect(x).to.deep.equal({ a: 1, b: 2 })
  })

  it('extend() should deep extend an array', () => {
    const x = extend({ a: 1, b: { c: 3 } }, { x: 2, y: { z: 4 } })
    expect(x).to.deep.equal({ a: 1, b: { c: 3 }, x: 2, y: { z: 4 } })
  })

  it('extend() should overwrite attributes in an array', () => {
    const x = extend({ a: 1 }, { a: 2 })
    expect(x).to.deep.equal({ a: 2 })
  })

  it('makeIndex() should create an index of an array', () => {
    const a = { id: 1 }
    const b = { id: 2 }
    const c = { id: 3 }
    const x = makeIndex([a, b, c], 'id')
    expect(x[1]).to.equal(a)
    expect(x[2]).to.equal(b)
    expect(x[3]).to.equal(c)
    expect(Object.keys(x).length).to.equal(3)
  })

  it('makeIndex() should use the correct index field', () => {
    const a = { a: 1, b: 2 }
    const x = makeIndex([a], 'a')
    expect(x[1]).to.equal(a)
  })

  it('makeIndex() should overwrite previous findings', () => {
    const a = { id: 1 }
    const b = { id: 1 }
    const x = makeIndex([a, b], 'id')
    expect(x[1]).to.equal(b)
    expect(Object.keys(x).length).to.equal(1)
  })

  it('removeObject() should remove an object from an array', () => {
    const a = {}
    const array = [a, {}, {}]
    const res = removeObject(array, a)
    expect(res).to.be.true
    expect(array.length).to.equal(2)
    expect(array.indexOf(a)).to.equal(-1)
  })

  it('removeObject() should only remove the first object from an array', () => {
    const a = {}
    const array = [a, {}, a]
    removeObject(array, a)
    expect(array.length).to.equal(2)
    expect(array[0]).to.not.equal(a)
    expect(array[1]).to.equal(a)
  })

  it('removeObject() should not remove an object that is not in an array', () => {
    const a = {}
    const array = [{}, {}, {}]
    const res = removeObject(array, a)
    expect(res).to.be.false
    expect(array.length).to.equal(3)
  })

  it('setOrRemove() should set an object property', () => {
    const obj = {}
    setOrRemove(obj, 'a', 1)
    expect(obj).to.deep.equal({ a: 1 })
  })

  it('setOrRemove() should remove an object property', () => {
    const obj = { a: 1 }
    setOrRemove(obj, 'a')
    expect(obj).to.deep.equal({})
  })

})
