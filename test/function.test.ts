import { promise, throttle, wait } from '../'

test('promise() should resolve with a given value', async () => {
  const a = {}
  const res = await promise(cb => cb(null, a))
  expect(res).toBe(a)
})

test('promise() should reject with a given error', async () => {
  let thrown = false
  try {
    await promise(cb => cb('error'))
  } catch (err) {
    expect(err).toBe('error')
    thrown = true
  }
  expect(thrown).toBe(true)
})

test('throttle() should be called once upon multiple quick requests', async () => {
  const cb = jest.fn()
  throttle(cb, 0)
  throttle(cb, 0)
  throttle(cb, 0)
  await wait(0)
  expect(cb).toHaveBeenCalledTimes(1)
})

test('throttle() should be called again after the timeout', async () => {
  const cb = jest.fn()
  throttle(cb, 0)
  await wait(0)
  throttle(cb, 0)
  await wait(0)
  expect(cb).toHaveBeenCalledTimes(2)
})
