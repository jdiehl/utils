import { expect } from 'chai'
import { spy } from 'sinon'
import { throttle, wait } from '../'

describe('timer', () => {

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
