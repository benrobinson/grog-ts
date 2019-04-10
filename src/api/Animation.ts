import {Event, EventKey, EventManager} from "./Event";
import {Tile} from "./TileSheet";
import {Coords, Degrees} from "./Util";
import {Positionable} from "./Positionable";
import {TickEvent} from "./Ticker";

export interface AnimationFrame {
  tile: Tile;
  rotation: Degrees;
  position: Coords;
}

export function animationFrame(tile: Tile, rotation: Degrees, position: Coords): AnimationFrame {
  return {
    tile,
    rotation,
    position
  }
}

export interface Animation {
  addFrame(frame: AnimationFrame): Animation;
  getFrame(frameNumber: number): AnimationFrame;
  setFramesPerSecond(fps: number): Animation;
  setLoops(loops: number): Animation;

  onFrame(fn: (frame: AnimationFrame) => any): Animation;
  onLoop(fn: (count: number) => any): Animation;
  onStart(fn: (frame: AnimationFrame) => any): Animation;
  onStop(fn: (frame: AnimationFrame) => any): Animation;

  play(frameNumber: number): Animation;
  show(frameNumber: number): Animation;
  stop(frameNumber: number): Animation;
}


