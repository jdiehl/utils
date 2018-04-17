import { escapeRegExp, parseJSON, repeat } from '../'

test('escapeRegExp() should escape regular expressions in strings', () => {
  expect(escapeRegExp('-[]/{}()*+?.\\^$|')).toBe('\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|')
  expect(escapeRegExp('Test [a-z]?')).toBe('Test \\[a\\-z\\]\\?')
})

test('parseJSON() should parse a JSON string', () => {
  const res = parseJSON('{"a":1}')
  expect(res).toEqual({ a: 1 })
})

test('parseJSON() should return an invalid value', () => {
  const res = parseJSON('test')
  expect(res).toBe('test')
})

test('repeat() should repeat a text 3 times', () => {
  const res = repeat('Hello', 3)
  expect(res).toBe('HelloHelloHello')
})

test('repeat() should repeat a text 0 times', () => {
  const res = repeat('Foo', 0)
  expect(res).toBe('')
})
