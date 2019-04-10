import {Event, EventCallback, EventKey, EventManager, EventListener} from "../api/Event";

export class DefaultEventManager implements EventManager {

  private listeners: {
    [key: string]: EventListener[];
  } = {};
  private pool: {
    [key: string]: Event[];
  } = {};

  clearPool(key: EventKey): EventManager {
    if (key in this.pool) {
      delete this.pool[key];
    }

    return this;
  }

  clearPoolAll(): EventManager {
    this.pool = {};

    return this;
  }

  publish(event: Event): EventManager {
    if (event.key in this.listeners) {
      this.listeners[event.key].forEach(listener => {
        if (listener.repetition <= 0 || listener.repetition > listener.repetitions) {
          listener.callback(event);
          listener.repetition++;
        }
      });
    }

    return this;
  }

  publishToPool(event: Event): EventManager {
    if (event.key in this.listeners) {
      if (event.key in this.pool) {
        this.pool[event.key].push(event);
      } else {
        this.pool[event.key] = [event];
      }
    }

    return this;
  }

  subscribe(key: EventKey, callback: EventCallback, repetitions = 0): EventManager {
    const listener: EventListener = {
      callback,
      repetition: 0,
      repetitions
    };

    if (key in this.listeners) {
      this.listeners[key].push(listener);
    } else {
      this.listeners[key] = [listener];
    }

    return this;
  }

  propagatePool(key: EventKey): EventManager {
    if (key in this.pool && key in this.listeners) {
      this.pool[key].forEach(event => {
        this.listeners[key].forEach(listener => {
          if (listener.repetition <= 0 || listener.repetition > listener.repetitions) {
            listener.callback(event);
            listener.repetition++;
          }
        });
      });
      this.clearPool(key);
    }

    return this;
  }

  propagatePoolAll(): EventManager {
    for (let key in this.pool) {
      this.propagatePool(key);
    }

    return this;
  }

}
