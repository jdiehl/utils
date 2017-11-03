import { mapAsync, mapToString, randomElement, removeValue } from '../src'

test('mapAsync() should map an array', async () => {
  const obj = ['a', 'b']
  const res = await mapAsync(obj, async (v, k) => `${k}:${v}`)
  expect(res).toEqual(['0:a', '1:b'])
})

test('mapToString() should map an array of numbers to strings', () => {
  const array = [0, 1, 2]
  const res = mapToString(array)
  expect(res).toEqual(['0', '1', '2'])
})

test('mapToString() should call toString() on an object of an array', () => {
  const a = jest.fn().mockReturnValue('a')
  const b = jest.fn().mockReturnValue('b')
  const array = [{ toString: a }, { toString: b }]
  const res = mapToString(array)
  expect(res).toEqual(['a', 'b'])
  expect(a).toHaveBeenCalledTimes(1)
  expect(b).toHaveBeenCalledTimes(1)
})

test('randomElement() should return the only element of an array', () => {
  const array = ['a']
  const res = randomElement(array)
  expect(res).toBe('a')
})

test('randomElement() should return an element of an array', () => {
  const array = [{}, {}, {}]
  const res = randomElement(array)
  expect(array.indexOf(res)).toBeGreaterThanOrEqual(0)
})

test('randomElement() should return undefined given an empty array', () => {
  const array: void[] = []
  const res = randomElement(array)
  expect(res).toBeUndefined
})

test('removeValue() should remove an object from an array', () => {
  const a = {}
  const array = [a, {}, {}]
  const res = removeValue(array, a)
  expect(res).toBe(true)
  expect(array.length).toBe(2)
  expect(array.indexOf(a)).toBe(-1)
})

test('removeValue() should only remove the first object from an array', () => {
  const a = {}
  const array = [a, {}, a]
  removeValue(array, a)
  expect(array.length).toBe(2)
  expect(array[0]).not.toBe(a)
  expect(array[1]).toBe(a)
})

test('removeValue() should not remove an object that is not in an array', () => {
  const a = {}
  const array = [{}, {}, {}]
  const res = removeValue(array, a)
  expect(res).toBe(false)
  expect(array.length).toBe(3)
})
