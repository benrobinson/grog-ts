import {Drawable} from "./Drawable";
import {Event, EventManager} from "./Event";

export interface StageManager {
  stages: Stage[];

  getStages(): Stage[];
  push(stage: Stage): StageManager;
  pop(): Stage;
  pause(): StageManager;
  unpause(): StageManager;
}

export interface Stage extends Drawable {
  start(eventManager: EventManager): Stage;
  end(eventManager: EventManager): Stage;
  pause(): Stage;
  unpause(): Stage;
}

export class StageStartEvent implements Event {
  static key: string = 'StageStart';
  public key = StageStartEvent.key;

  public stage: Stage;

  constructor(stage: Stage) {
    this.stage = stage;
  }
}

export class StageStartedEvent implements Event {
  static key: string = 'StageStarted';
  public key = StageStartedEvent.key;

  public stage: Stage;

  constructor(stage: Stage) {
    this.stage = stage;
  }
}

export class StageEndEvent implements Event {
  static key: string = 'StageEnd';
  public key = StageEndEvent.key;

  public stage: Stage;

  constructor(stage: Stage) {
    this.stage = stage;
  }
}

export class StageEndedEvent implements Event {
  static key: string = 'StageEnded';
  public key = StageEndedEvent.key;

  public stage: Stage;

  constructor(stage: Stage) {
    this.stage = stage;
  }
}
