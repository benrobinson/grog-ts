import {Degrees, Dimensions} from "./Util";


export interface DrawingOutput {
  image: any;

  getDimensions(): Dimensions;
  getImage(): any;
  clear(): void;
  drawFilledRect(color: string, x: number, y: number, width: number, height: number): void;
  drawFilledScreen(color: string): void;
  drawImage(
    image: any,
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number): void;
  drawImageAt(image: any, x: number, y: number);
  drawImageAtOrigin(image: any);
  rotate(degrees: Degrees): void;
  restore(): void;
  save(): void;
  scale(x: number, y: number): void;
  translate(x: number, y: number): void;
}



