import {EventManager} from "../api/Event";
import {DrawingOutput} from "../api/DrawingOutput";
import {Coords} from "../api/Util";
import {Camera} from "../api/Camera";

export class DefaultCamera implements Camera {

  private eventManager: EventManager;
  private inputDrawingOutput: DrawingOutput;
  private cameraDrawingOutput: DrawingOutput;
  private offsetCoords: Coords;

  constructor(
    eventManager: EventManager,
    inputDrawingOutput: DrawingOutput,
    cameraDrawingOutput: DrawingOutput) {

    this.eventManager = eventManager;
    this.inputDrawingOutput = inputDrawingOutput;
    this.cameraDrawingOutput = cameraDrawingOutput;
  }

  private _focus(axis: string, value: number): void {
    const dimension = axis === 'x' ? 'width' : 'height';

    if (this.inputDrawingOutput[dimension] <= this.cameraDrawingOutput[dimension]) {
      this.offsetCoords[axis] = 0;
    } else {
      const edgeBuffer = this.cameraDrawingOutput[dimension] / 2;

      // Camera can't go beyond the min edge.
      if (value <= edgeBuffer) {
        this.offsetCoords[axis] = 0;
        return;
      }

      // Camera can't go beyond the max edge.
      if (value >= this.inputDrawingOutput[dimension] || (this.inputDrawingOutput[dimension] - value) <= edgeBuffer) {
        this.offsetCoords[axis] = this.inputDrawingOutput[dimension] - this.cameraDrawingOutput[dimension];
        return;
      }

      this.offsetCoords[axis] = value - edgeBuffer;
      return;
    }
  }

  focus = (x: number, y: number): Camera => {
    this._focus('x', x);
    this._focus('y', y);
    return this;
  };

  draw = (output: DrawingOutput): Camera => {
    this.cameraDrawingOutput.drawImageAt(this.inputDrawingOutput.getImage(), -this.offsetCoords.x, -this.offsetCoords.y);
    output.drawImageAtOrigin(this.cameraDrawingOutput.getImage());
    return this;
  }
}
