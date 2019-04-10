import {Coords} from "../api/Util";
import {Drawable} from "../api/Drawable";
import {CanvasDrawingOutput} from "./CanvasDrawingOutput";
import {DrawingOutput} from "../api/DrawingOutput";
import {TileSheet} from "../api/TileSheet";

export default function CanvasTileDrawing(tileCoords: Coords[][], tileSheet: TileSheet): Drawable {

  const tiles = tileCoords.map((_row, row) => _row.map((_column, column) => {
    return tileSheet.getTile(tileCoords[row][column].x, tileCoords[row][column].y);
  }));

  function makeCachedImage() {
    const width = tiles[0].length * this.tileSheet.tileWidth;
    const height = tiles.length * this.tileSheet.tileHeight;
    const cacheOutput: CanvasDrawingOutput = new CanvasDrawingOutput().setWidth(width).setHeight(height);
    const dWidth = width / this.tiles[0].length;
    const dHeight = height / this.tiles.length;

    tiles.forEach((_row, row) => _row.forEach((_column, column) => {
      tiles[row][column]
        .makeDrawable(column * dWidth, row * dHeight, dWidth, dHeight)
        .draw(cacheOutput);
    }));

    return cacheOutput.getImage();
  }

  const cachedImage = makeCachedImage();

  function draw(output: DrawingOutput) {
    output.drawImageAtOrigin(cachedImage);
  }

  return { draw };
}
