import { randomInt, within } from '../src'

test('randomInt() should generate an integer', () => {
  const x = randomInt(0, 100)
  expect(typeof x).toBe('number')
  expect(x.toString()).not.toContain('.')
})

test('randomInt() should generate a number within the limits', () => {
  for (let i = 0; i < 100; i++) {
    const x = randomInt(3, 1)
    expect(x).toBeGreaterThanOrEqual(3)
    expect(x).toBeLessThanOrEqual(4)
  }
})

test('within() should return the correct result', () => {
  expect(within(5, 0, 10)).toBe(5)
  expect(within(-1, 0, 10)).toBe(0)
  expect(within(11, 0, 10)).toBe(10)
  expect(within(3, -5, -3)).toBe(-3)
  expect(within(0, 0, 0)).toBe(0)
})
