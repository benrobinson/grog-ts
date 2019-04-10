import {DrawingOutput} from "../api/DrawingOutput";
import {EventManager} from "../api/Event";
import {Ticker} from "../api/Ticker";
import {Stage, StageEndedEvent, StageEndEvent, StageStartedEvent, StageStartEvent} from "../api/Stage";

export class BlankStage implements Stage {
  private stageDrawingOutput: DrawingOutput;
  private stageEventManager: EventManager;
  private ticker: Ticker;

  constructor(stageDrawingOutput: DrawingOutput, stageEventManager: EventManager, ticker: Ticker) {
    this.stageDrawingOutput = stageDrawingOutput;
    this.stageEventManager = stageEventManager;
    this.ticker = ticker;
  }

  draw(gameDrawingOutput: DrawingOutput) {
    console.log('trying to draw');
    this.stageDrawingOutput.drawFilledScreen('#000000');
    gameDrawingOutput.drawImageAtOrigin(this.stageDrawingOutput.getImage())
  }

  start(gameEventManager: EventManager): Stage {
    this.unpause();

    this.stageEventManager.subscribe(StageStartEvent.key, () => {
      this.stageEventManager.publish(new StageStartedEvent(this));
    }, 1);

    this.stageEventManager.subscribe(StageStartedEvent.key, () => {
      gameEventManager.publish(new StageStartedEvent(this));
    }, 1);

    this.stageEventManager.publish(new StageStartEvent(this));

    return this;
  }

  end(gameEventManager: EventManager) {
    this.ticker.stop();

    this.stageEventManager.subscribe(StageEndEvent.key, () => {
      this.stageEventManager.publish(new StageEndedEvent(this));
    }, 1);

    this.stageEventManager.subscribe(StageEndedEvent.key, () => {
      gameEventManager.publish(new StageEndedEvent(this));
    }, 1);

    this.stageEventManager.publish(new StageEndEvent(this));

    return this;
  }

  pause() {
    this.ticker.stop();
    return this;
  }

  unpause() {
    this.ticker.start();
    return this;
  }
}
