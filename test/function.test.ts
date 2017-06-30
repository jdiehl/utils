import { expect } from 'chai'
import { spy } from 'sinon'
import { promise, throttle, wait } from '../'

describe('function', () => {

  it('promise() should resolve with a given value', async () => {
    const a = {}
    const res = await promise(cb => cb(null, a))
    expect(res).to.equal(a)
  })

  it('promise() should reject with a given error', async () => {
    let thrown = false
    try {
      await promise(cb => cb('error'))
    } catch (err) {
      expect(err).to.equal('error')
      thrown = true
    }
    expect(thrown).to.be.true
  })

  it('throttle() should be called once upon multiple quick requests', async () => {
    const cb = spy()
    throttle(cb, 0)
    throttle(cb, 0)
    throttle(cb, 0)
    await wait(0)
    expect(cb.callCount).to.equal(1)
  })

  it('throttle() should be called again after the timeout', async () => {
    const cb = spy()
    throttle(cb, 0)
    await wait(0)
    throttle(cb, 0)
    await wait(0)
    expect(cb.callCount).to.equal(2)
  })

})
