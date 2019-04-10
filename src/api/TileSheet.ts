import {ImageAsset} from "./Assets";
import {Drawable} from "./Drawable";
import {DrawingOutput} from "./DrawingOutput";
import {Coords} from "./Util";
import {CanvasDrawingOutput} from "../impl/CanvasDrawingOutput";

export interface Tile {
  imageAsset: ImageAsset;
  x: number;
  y: number;
  width: number;
  height: number;

  makeDrawable(dx: number, dy: number, dWidth: number, dHeight: number): Drawable;
}

function tile(imageAsset: ImageAsset, x: number, y: number, width: number, height: number): Tile {

  function makeDrawable(dx: number, dy: number, dWidth: number, dHeight: number): Drawable {
    return {
      draw: (output: DrawingOutput) => output.drawImage(imageAsset.value, x, y, width, height, dx, dy, dWidth, dHeight);
    }
  }

  return {
    imageAsset,
    height,
    width,
    x,
    y,
    makeDrawable
  }
}

export interface TileSheet {
  tileWidth: number;
  tileHeight: number;

  getTile(x: number, y: number): Tile;
}

function tileSheet(imageAsset: ImageAsset, tileWidth: number, tileHeight: number): TileSheet {

  function getTile(x: number, y: number) {
    const pixelX = x * tileWidth;
    const pixelY = y * tileHeight;

    return tile(imageAsset, pixelX, pixelY, tileWidth, tileHeight);
  }

  return {
    tileWidth,
    tileHeight,
    getTile
  };
}




