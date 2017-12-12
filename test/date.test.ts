import { stringToDuration } from '../'

test('stringToDuration() should transform durations', () => {
  expect(stringToDuration('2s')).toBe(2 * 1000)
  expect(stringToDuration('3m')).toBe(3 * 60 * 1000)
  expect(stringToDuration('4h')).toBe(4 * 60 * 60 * 1000)
  expect(stringToDuration('5d')).toBe(5 * 24 * 60 * 60 * 1000)
  expect(stringToDuration('6w')).toBe(6 * 7 * 24 * 60 * 60 * 1000)
  expect(stringToDuration('8y')).toBe(8 * 365 * 24 * 60 * 60 * 1000)
})
