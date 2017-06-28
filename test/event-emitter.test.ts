import { expect } from 'chai'
import { spy } from 'sinon'
import { EventEmitter, IEventSubscription } from '../'

describe('EventEmitter', () => {
  let listener: any
  let emitter: EventEmitter
  let subscription: IEventSubscription

  beforeEach(() => {
    listener = spy()
    emitter = new EventEmitter()
    subscription = emitter.on('event', listener)
  })

  it('should call a listener when emitting events', () => {
    emitter.emit('event')
    expect(listener.called).to.be.true
  })

  it('should call multiple listeners when emitting events', () => {
    const a = spy()
    const b = spy()
    emitter.on('event', a)
    emitter.on('event', b)
    emitter.emit('event')
    expect(a.called).to.be.true
    expect(b.called).to.be.true
  })

  it('should pass a parameter', () => {
    emitter.emit('event', 'test')
    expect(listener.calledWith('test')).to.be.true
  })

  it('should pass multiple parameters', () => {
    const obj = {}
    emitter.emit('event', 1, 'b', obj)
    expect(listener.calledWith(1, 'b', obj)).to.be.true
  })

  it('should only call the correct listener', () => {
    const a = spy()
    const b = spy()
    emitter.on('a', a)
    emitter.on('b', b)
    emitter.emit('a')
    expect(a.called).to.be.true
    expect(b.called).to.be.false
  })

  it('should not call a destroyed listener', () => {
    subscription.destroy()
    emitter.emit('event')
    expect(listener.called).to.be.false
  })

  it('should manually trigger a listener', () => {
    subscription.trigger()
    expect(listener.called).to.be.true
  })

})
