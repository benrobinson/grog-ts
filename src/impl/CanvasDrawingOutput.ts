import {Degrees, Dimensions} from "../api/Util";
import {DrawingOutput} from "../api/DrawingOutput";

export class CanvasDrawingOutput implements DrawingOutput {

  private image: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement = null) {
    console.log(canvas, !canvas);
    if (!canvas) {
      this.image = window.document.createElement<HTMLCanvasElement>('canvas');
    } else {
      this.image = canvas;
    }
    console.log(this.image);
    this.image.style.imageRendering = 'pixelated';
    this.context = this.image.getContext("2d");
    this.context.mozImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
  }

  setWidth(width: number): CanvasDrawingOutput {
    this.image.width = width;
    return this;
  }

  setHeight(height: number): CanvasDrawingOutput {
    this.image.height = height;
    return this;
  }

  getImage = (): HTMLCanvasElement => this.image;
  getDimensions = (): Dimensions => {
    return {
      width: this.image.width,
      height: this.image.height
    }
  };

  clear(): void {
    this.context.clearRect(0, 0, this.image.width, this.image.height);
  }
  drawFilledRect(color: string, x: number, y: number, width: number, height: number): void {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }
  drawFilledScreen(color: string) {
    this.drawFilledRect(color, 0, 0, this.image.width, this.image.height);
  }
  drawImage = (image: any,
               sx: number,
               sy: number,
               sWidth: number,
               sHeight: number,
               dx: number,
               dy: number,
               dWidth: number,
               dHeight: number): void  => this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  drawImageAt = (image: any, x: number, y: number) => this.context.drawImage(image, x, y);
  drawImageAtOrigin = (image: any) => this.drawImageAt(image, 0, 0);
  restore = (): void => this.context.restore();
  rotate = (degrees: Degrees): void => this.context.rotate(degrees.toRadians());
  save = (): void => this.context.save();
  scale = (x: number, y: number): void => this.context.scale(x, y);
  translate = (x: number, y: number): void => this.context.translate(x, y);
}
