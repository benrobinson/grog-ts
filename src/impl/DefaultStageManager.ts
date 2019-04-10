import {EventManager} from "../api/Event";
import {DrawingOutput} from "../api/DrawingOutput";
import {Stage, StageEndedEvent, StageManager, StageStartedEvent} from "../api/Stage";

export class DefaultStageManager implements StageManager {
  private eventManager: EventManager;
  private stages: Stage[] = [];

  constructor(eventManager: EventManager, rootStage: Stage) {
    this.eventManager = eventManager;

    this.eventManager.subscribe(StageStartedEvent.key, (stageStartedEvent) => {
      this.stages.push(stageStartedEvent.stage);
    });

    this.eventManager.subscribe(StageEndedEvent.key, () => {
      this.stages.pop();
      this.getLast().unpause();
    });

    rootStage.start(this.eventManager);
  }

  private getLast(): Stage {
    return this.stages[this.stages.length - 1];
  }

  getStages(): Stage[] {
    return this.stages;
  }

  pause(): StageManager {
    this.stages.forEach(stage => stage.pause());
    return this;
  }

  unpause(): StageManager {
    this.getLast().unpause();
    return this;
  }

  push(stage: Stage): StageManager {
    this.getLast().pause();
    stage.start(this.eventManager);
    return this;
  }

  pop(): Stage {
    if (this.stages.length < 2) throw new Error('Cannot pop root stage');

    const stage = this.stages.pop();
    stage.end(this.eventManager);

    return stage;
  }
}
