import { ISubscriber } from "./Subscriber"

export interface IDispatcher {
  dispatch(event)
}

export class Dispatcher implements IDispatcher {
  static instance?: IDispatcher
  config: any
  subscribers: {
    [key: string]: ISubscriber
  } = {}

  constructor(config?: any) {
    this.config = config
    this.subscribers = config && config.subscribers
  }

  dispatch(event) {
    Object.values(this.subscribers).map(subscriber => {
      subscriber.notify(event)
    })
  }

  subscribe(subscriber, name?: string) {
    const $name: string = name || subscriber.name || subscriber.id || 'default'
    this.subscribers[$name] = subscriber
  }

  static create(config: any) {
    this.instance = this.instance || new Dispatcher(config)
  }
}