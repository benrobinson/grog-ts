import {EventKey, EventManager, Event} from "./Event";

enum TickerState {
  RUNNING,
  STOPPED
}

export class TickEvent implements Event {
  static key = 'TickEvent';
  public key: EventKey = TickEvent.key;
  public readonly deltaTime;

  constructor(deltaTime: number) {
    this.deltaTime = deltaTime;
  }
}

export class Ticker {

  private state: TickerState = TickerState.STOPPED;
  private time: number = new Date().getTime();
  private eventManager: EventManager;
  private animationRequestId: number;

  constructor(eventManager: EventManager) {
    this.eventManager = eventManager;
  }

  private tick(): void {
    if (this.state !== TickerState.RUNNING) return;

    const time = new Date().getTime();
    const deltaTime = (time - this.time) / 1000;

    this.time = time;
    this.eventManager.publish(new TickEvent(deltaTime));
    this.animationRequestId = window.requestAnimationFrame(this.tick.bind(this));
  }

  start(): Ticker {
    if (this.state === TickerState.RUNNING) return this;

    this.state = TickerState.RUNNING;
    this.time = new Date().getTime();
    this.tick();

    return this;
  }

  stop(): Ticker {
    this.state = TickerState.STOPPED;

    window.cancelAnimationFrame(this.animationRequestId);

    return this;
  }

}


