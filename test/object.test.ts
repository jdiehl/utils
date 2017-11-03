import { clone, each, eachAsync, equals, extend, getKeyPath, makeIndex, map, setOrRemove } from '../src'

test('clone() should return a simple type', () => {
  expect(clone(3)).toBe(3)
  expect(clone('a')).toBe('a')
})

test('clone() should create a clone of an object', () => {
  const a = {}
  const x = clone(a)
  expect(x).not.toBe(a)
  expect(x).toEqual(a)
})

test('clone() should create a deep clone of an object', () => {
  const a = {}
  const b = { a }
  const x = clone(b)
  expect(x.a).not.toBe(a)
  expect(x.a).toEqual(a)
})

test('clone() should create a clone of an array', () => {
  const a = [1, 2, 3]
  const x = clone(a)
  expect(x).not.toBe(a)
  expect(x).toEqual(a)
})

test('clone() should create a clone of a date object', () => {
  const a = new Date()
  const x = clone(a)
  expect(x).not.toBe(a)
  expect(x.getTime()).toBe(a.getTime())
})

test('each() should iterate over an object', () => {
  const iterator = jest.fn()
  const obj = { a: 1, b: 2 }
  const res = each(obj, iterator)
  expect(res).toBe(true)
  expect(iterator).toHaveBeenCalledTimes(2)
  expect(iterator).toHaveBeenCalledWith(1, 'a')
  expect(iterator).toHaveBeenCalledWith(2, 'b')
})

test('each() should cancel iteration upon request', () => {
  const iterator = jest.fn().mockReturnValue(false)
  const obj = { a: 1, b: 2 }
  const res = each(obj, iterator)
  expect(res).toBe(false)
  expect(iterator).toHaveBeenCalledTimes(1)
  expect(iterator).toHaveBeenCalledWith(1, 'a')
  expect(iterator).not.toHaveBeenCalledWith(2, 'b')
})

test('eachAsync() should iterate over an object', async () => {
  const iterator = jest.fn().mockImplementation((x, i) => i)
  const obj = { a: 1, b: 2 }
  const res = await eachAsync(obj, async (x, i) => iterator(x, i))
  expect(res).toEqual(['a', 'b'])
  expect(iterator).toHaveBeenCalledTimes(2)
  expect(iterator).toHaveBeenCalledWith(1, 'a')
  expect(iterator).toHaveBeenLastCalledWith(2, 'b')
})

test('equals() should return correct results', async () => {
  expect(equals(0, 0)).toBe(true)
  expect(equals(0, 1)).toBe(false)
  expect(equals({ a: 1 }, { a: 1 })).toBe(true)
  expect(equals({ a: 1 }, { a: 2 })).toBe(false)
  expect(equals([0, 1], [0, 1])).toBe(true)
  expect(equals([0, 1], [0, 2])).toBe(false)
})

test('extend() should extend an object', () => {
  const x = extend({ a: 1 }, { b: 2 })
  expect(x).toEqual({ a: 1, b: 2 })
})

test('extend() should deep extend an object', () => {
  const x = extend({ a: 1, b: { c: 3 } }, { x: 2, y: { z: 4 } })
  expect(x).toEqual({ a: 1, b: { c: 3 }, x: 2, y: { z: 4 } })
})

test('extend() should overwrite attributes in an object', () => {
  const x = extend({ a: 1 }, { a: 2 })
  expect(x).toEqual({ a: 2 })
})

test('getKeyPath() should fetch a value for a key', () => {
  const value = {}
  const obj = { key: value }
  const x = getKeyPath(obj, 'key')
  expect(x).toBe(value)
})

test('getKeyPath() should fetch a value for a key path', () => {
  const obj = { a: { b: 'c' } }
  const x = getKeyPath(obj, 'a.b')
  expect(x).toBe('c')
})

test('getKeyPath() should return undefined for an invalid key path', () => {
  const obj = { a: { b: 'c' } }
  const x = getKeyPath(obj, 'c.d')
  expect(x).toBeUndefined
})

test('makeIndex() should create an index of an array', () => {
  const a = { id: 1 }
  const b = { id: 2 }
  const c = { id: 3 }
  const x = makeIndex([a, b, c], 'id')
  expect(x[1]).toBe(a)
  expect(x[2]).toBe(b)
  expect(x[3]).toBe(c)
  expect(Object.keys(x).length).toBe(3)
})

test('makeIndex() should use the correct index field', () => {
  const a = { a: 1, b: 2 }
  const x = makeIndex([a], 'a')
  expect(x[1]).toBe(a)
})

test('makeIndex() should overwrite previous findings', () => {
  const a = { id: 1 }
  const b = { id: 1 }
  const x = makeIndex([a, b], 'id')
  expect(x[1]).toBe(b)
  expect(Object.keys(x).length).toBe(1)
})

test('map() should map object values', () => {
  const x = { a: 1, b: 2 }
  const y = map(x, (d, k) => k + d)
  expect(y).toEqual({ a: 'a1', b: 'b2' })
})

test('setOrRemove() should set an object property', () => {
  const obj = {}
  setOrRemove(obj, 'a', 1)
  expect(obj).toEqual({ a: 1 })
})

test('setOrRemove() should remove an object property', () => {
  const obj = { a: 1 }
  setOrRemove(obj, 'a')
  expect(obj).toEqual({})
})
