export type EventKey = string;

export interface Event {
  key: EventKey;
}

export type EventCallback = (Event) => any;

export interface EventListener {
  callback: EventCallback;
  repetition: number;
  repetitions: number;
}

export interface EventManager {
  listeners: {
    [key: string]: EventListener[];
  };
  pool: {
    [key: string]: Event[];
  };

  clearPool(key: EventKey): EventManager;
  clearPoolAll(): EventManager;
  publish(event: Event): EventManager;
  publishToPool(event: Event): EventManager;
  subscribe(key: EventKey, listener: EventCallback, repetitions?: number): EventManager;
  propagatePool(key: EventKey): EventManager;
  propagatePoolAll(): EventManager;
}
