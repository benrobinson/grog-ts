import {Velocity} from "./Util";


export interface Moveable {
  velocity: Velocity;

  setVelocityX(xSpeed: number): Moveable;
  setVelocityY(ySpeed: number): Moveable;
  changeVelocityX(amount: number): Moveable;
  changeVelocityY(amount: number): Moveable;
}


