import {Drawable, DrawableGroupLayers} from "./Drawable";
import {EventManager} from "./Event";
import {DrawingOutput} from "./DrawingOutput";
import {Coords} from "./Util";


export interface Camera extends Drawable {
  eventManager: EventManager;
  inputDrawingOutput: DrawingOutput;
  cameraDrawingOutput: DrawingOutput;
  offsetCoords: Coords;

  focus(x: number, y: number): Camera;
}


