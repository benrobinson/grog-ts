import {EventManager} from "./Event";
import {Ticker, TickEvent} from "./Ticker";
import {DrawingOutput} from "./DrawingOutput";
import {Stage, StageManager} from "./Stage";

export class GameStartEvent {
  static key = 'GameStart';
  public key = GameStartEvent.key;
}

export class Game {
  public drawingOutput: DrawingOutput;
  public eventManager: EventManager;
  public stageManager: StageManager;
  public ticker: Ticker;

  constructor(drawingOutput: DrawingOutput, eventManager: EventManager, stageManager: StageManager, ticker: Ticker) {
    this.drawingOutput = drawingOutput;
    this.eventManager = eventManager;
    this.stageManager = stageManager;
    this.ticker = ticker;
  }

  start() {
    this.eventManager.subscribe(TickEvent.key, () => {
      this.stageManager.getStages().forEach(stage => stage.draw(this.drawingOutput));
    });

    this.eventManager.publish(new GameStartEvent());

    this.ticker.start();
  }

  pushStage(stage: Stage): void {
    this.stageManager.push(stage);
  }

  popStage(): void {
    this.stageManager.pop();
  }

  pause(): void {
    this.stageManager.pause()
  }

  unpause(): void {
    this.stageManager.unpause();
  }

  mount(element: HTMLElement) {
    element.appendChild(this.drawingOutput.getImage());
  }

}



