import { each, removeObject } from './object'

export interface EventSubscription {
  destroy(): void
  trigger(...args: any[]): EventSubscription
}

// event emitter base class
export class EventEmitter<EventType extends string = string> {

  private subscriptions: { [event: string]: EventSubscription[] } = {}

  on(event: EventType, listener: (...args: any[]) => void): EventSubscription {
    this.subscriptions[event] = this.subscriptions[event] || []
    const subscription: EventSubscription = {
      destroy: () => removeObject(this.subscriptions[event], listener),
      trigger: (...args: any[]) => {
        listener.apply(null, args)
        return subscription
      }
    }
    this.subscriptions[event].push(subscription)
    return subscription
  }

  emit(event: EventType, ...args: any[]) {
    if (!this.subscriptions[event]) return
    for (const subscription of this.subscriptions[event]) {
      subscription.trigger.apply(null, args)
    }
  }

  destroyAllSubscriptions() {
    each<EventSubscription[]>(this.subscriptions, subs => subs.forEach(sub => sub.destroy()))
  }

}
