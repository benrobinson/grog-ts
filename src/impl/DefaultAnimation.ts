import {EventManager} from "../api/Event";
import {TickEvent} from "../api/Ticker";
import {Animation, AnimationFrame} from "../api/Animation";
import {Coords, Degrees} from "../api/Util";
import {Tile} from "../api/TileSheet";

export class DefaultAnimation implements Animation {

  private eventManager: EventManager;
  private currentFrameNumber: number = 0;
  private currentLoop: number = 0;
  private currentFramePart: number = 0;
  private frames: AnimationFrame[] = [];
  private framesPerSecond: number = 60;
  private isPlaying: boolean = false;
  private loops: number = 0;
  private handleFrame: (frame: AnimationFrame) => any = (frame: AnimationFrame) => ({});
  private handleLoop: (count: number) => any = (count: number) => ({});
  private handleStart: (frame: AnimationFrame) => any = (frame: AnimationFrame) => ({});
  private handleStop: (frame: AnimationFrame) => any = (frame: AnimationFrame) => ({});

  constructor(eventManager: EventManager) {
    this.eventManager = eventManager;
    this.eventManager.subscribe(TickEvent.key, this.handleAnimationUpdateEvent)
  }

  private handleAnimationUpdateEvent = (tickEvent: TickEvent): void => {
    if (!this.isPlaying) return;

    const deltaTime = tickEvent.deltaTime;

    this.currentFramePart += deltaTime * this.framesPerSecond;
    if (this.currentFramePart < 1) {
      return;
    } else {
      this.currentFramePart = 0;
    }

    const maybeNextFrameNumber: number = this.currentFrameNumber + 1;
    if (maybeNextFrameNumber < this.frames.length) {
      this.show(maybeNextFrameNumber);
    } else if (this.loops === 0 || this.currentLoop < this.loops) {
      this.show(0);
      this.currentLoop++;
      this.handleLoop(this.currentLoop);
    } else {
      this.stop(0);
    }
  };

  addFrame = (frame: AnimationFrame): Animation => {
    this.frames.push(frame);
    return this;
  };

  getFrame = (frameNumber: number): AnimationFrame => {
    if (this.frames.length <= 0) throw Error("Animation has no frames!");

    if (frameNumber < this.frames.length && !!this.frames[frameNumber]) {
      return this.frames[frameNumber];
    } else {
      return this.frames[0];
    }
  };

  setFramesPerSecond = (fps: number): Animation => {
    this.framesPerSecond = fps;
    return this;
  };

  setLoops = (loops: number): Animation => {
    this.loops = loops;
    return this;
  };

  onFrame = (fn: (frame: AnimationFrame) => any): Animation => {
    this.handleFrame = fn;
    return this;
  };

  onLoop = (fn: (count: number) => any): Animation => {
    this.handleLoop = fn;
    return this;
  };

  onStart = (fn: (frame: AnimationFrame) => any): Animation => {
    this.handleStart = fn;
    return this;
  };

  onStop = (fn: (frame: AnimationFrame) => any): Animation => {
    this.handleStop = fn;
    return this;
  };

  play = (frameNumber: number): Animation => {
    if (this.isPlaying) return this;

    this.isPlaying = true;
    this.show(frameNumber);
    this.handleStart(this.getFrame(frameNumber));

    return this;
  };

  show = (frameNumber: number): Animation => {
    this.currentFrameNumber = frameNumber;
    this.handleFrame(this.getFrame(frameNumber));

    return this;
  };

  stop = (frameNumber: number): Animation => {
    if (!this.isPlaying) return this;

    this.isPlaying = false;
    this.show(frameNumber);
    this.handleStop(this.getFrame(frameNumber));

    return this;
  };

}
