import { removeValue } from './array'
import { each } from './object'

export interface IEventSubscription {
  destroy(): void
  trigger(...args: any[]): IEventSubscription
}

// event emitter base class
export class EventEmitter<EventType extends string = string> {

  private subscriptions: Record<string, IEventSubscription[]> = {}

  on(event: EventType, listener: (...args: any[]) => void): IEventSubscription {
    this.subscriptions[event] = this.subscriptions[event] || []
    const subscription: IEventSubscription = {
      destroy: () => removeValue(this.subscriptions[event], subscription),
      trigger: (...args: any[]) => {
        listener(...args)
        return subscription
      }
    }
    this.subscriptions[event].push(subscription)
    return subscription
  }

  emit(event: EventType, ...args: any[]): void {
    if (!this.subscriptions[event]) return
    for (const subscription of this.subscriptions[event]) {
      subscription.trigger.apply(null, args)
    }
  }

  destroyAllSubscriptions(): void {
    each<IEventSubscription[]>(this.subscriptions, subs => subs.forEach(sub => sub.destroy()))
  }

}
