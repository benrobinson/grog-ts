import {Entity} from "./Entity";
import {Drawable} from "./Drawable";
import {Coords} from "./Util";

export type LevelBehavior = (entity: Entity, axisKey: string) => any;

export const LevelBehaviorNoop: LevelBehavior = (entity: Entity = null, axisKey: string = '') => {};

export interface Level extends Drawable {
  behaviors: number[][];
  behaviorTypes: {
    [key: number]: LevelBehavior
  };
  width: number;
  height: number;
  drawing: Drawable;
  tileSize: number;

  getBehavior(x: number, y: number): LevelBehavior;
  setBehavior(x: number, y: number, behavior: LevelBehavior): Level;
  getTileCoordsFromPixels(x: number, y: number): Coords;
}


