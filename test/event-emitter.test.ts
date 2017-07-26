import { EventEmitter, IEventSubscription } from '../'

const listener = jest.fn()
let emitter: EventEmitter
let subscription: IEventSubscription

beforeEach(() => {
  listener.mockReset()
  emitter = new EventEmitter()
  subscription = emitter.on('event', listener)
})

test('should call a listener when emitting events', () => {
  emitter.emit('event')
  expect(listener).toHaveBeenCalledTimes(1)
})

test('should call multiple listeners when emitting events', () => {
  const a = jest.fn()
  const b = jest.fn()
  emitter.on('event', a)
  emitter.on('event', b)
  emitter.emit('event')
  expect(a).toHaveBeenCalledTimes(1)
  expect(b).toHaveBeenCalledTimes(1)
})

test('should pass a parameter', () => {
  emitter.emit('event', 'test')
  expect(listener).toHaveBeenCalledWith('test')
})

test('should pass multiple parameters', () => {
  const obj = { foo: 'bar' }
  emitter.emit('event', 1, 'b', obj)
  expect(listener).toHaveBeenCalledWith(1, 'b', obj)
})

test('should only call the correct listener', () => {
  const a = jest.fn()
  const b = jest.fn()
  emitter.on('a', a)
  emitter.on('b', b)
  emitter.emit('a')
  expect(a).toHaveBeenCalledTimes(1)
  expect(b).toHaveBeenCalledTimes(0)
})

test('should not call a destroyed listener', () => {
  subscription.destroy()
  emitter.emit('event')
  expect(listener).toHaveBeenCalledTimes(0)
})

test('should manually trigger a listener', () => {
  subscription.trigger()
  expect(listener).toHaveBeenCalledTimes(1)
})
