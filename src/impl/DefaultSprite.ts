import {Degrees} from "../api/Util";
import {DrawingOutput} from "../api/DrawingOutput";
import {AnimatedSprite, Sprite, SpriteGroup} from "../api/Sprite";

export class DefaultAnimatedSprite implements AnimatedSprite {

  private _animations: {
    [key: string]: Animation
  } = {};
  private _animation: string = null;
  private _group: SpriteGroup = null;
  private _isFlipped: boolean = false;
  private _rotation: Degrees;
  private _scale: number = 1;

  public x: number;
  public y: number;

  public draw = (output: DrawingOutput) => {};

  private _draw = (): Sprite => {
    if (Object.keys(this._animations).length < 1 || !this._animation) return this;

    this._animations[this._animation].onFrame(frame => {
      this.draw = (output: DrawingOutput) => {
        const dWidth = frame.tile.width * this._scale;
        const dHeight = frame.tile.height * this._scale;
        output.save();
        output.translate(this.x + this._group.x + frame.position.x, this.y + this._group.y + frame.position.y);
        output.scale(this._isFlipped ? -1 : 1, 1);
        output.rotate(this._rotation.toRadians() + frame.rotation);
        frame.tile
          .makeDrawable(-(dWidth / 2), -(dHeight / 2), dWidth, dHeight)
          .draw(output);
        output.restore();
      };
    });

    return this;
  };

  flip(): Sprite {
    this._isFlipped = !this._isFlipped;
    return this;
  }

  rotate(degrees: Degrees) {
    this._rotation = degrees;
  }

  position = (x: number, y: number): Sprite => {
    this.x = x;
    this.y = y;
    return this;
  };

  private useAnimation(key: string) {
    if (!!this._animations[key]) {
      this._animation = key;
      this._draw();
    }
  }

  addAnimation = (key: string, animation: Animation): AnimatedSprite => {
    this._animations[key] = animation;
    return this;
  };

  playAnimation = (key: string, frameNumber: number = 0): AnimatedSprite => {
    if (!!this._animations[key]) {
      this.useAnimation(key);
      this._animations[key].play(frameNumber);
    }
    return this;
  };

  removeAnimation = (key: string): AnimatedSprite => {
    if (!!this._animations[key]) delete this._animations[key];
    return this;
  };

  stopAnimation = (key: string, frameNumber: number = 0): AnimatedSprite => {
    if (!!this._animations[key]) {
      this.useAnimation(key);
      this._animations[key].stop(frameNumber);
    }
    return this;
  };

  setGroup = (group: SpriteGroup): Sprite => {
    this._group = group;
    return this;
  };

  unsetGroup = (): Sprite => {
    this._group = null;
    return this;
  };

}
