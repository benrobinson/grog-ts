import {Bounds, Coords} from "./Util";

export interface Sizeable {
  width: number;
  height: number;

  boundOffsetX(offsetX: number): Sizeable;
  boundOffsetY(offsetY: number): Sizeable;
  getBounds(): Bounds;
  getBoundsFromCoords(x: number, y: number);
  getCenterCoords(): Coords;
}


