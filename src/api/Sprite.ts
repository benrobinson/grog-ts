import {Drawable} from "./Drawable";
import {Positionable} from "./Positionable";
import {Degrees, readWriter} from "./Util";
import {DrawingOutput} from "./DrawingOutput";


export interface SpriteGroup extends Drawable, Positionable {
  sprites: {
    [key: string]: Sprite
  }
  spriteLayers: string[];
  isShown: boolean;

  addSprite(key: string, sprite: Sprite): SpriteGroup;
  removeSprite(key: string): SpriteGroup;
}

export interface Sprite extends Drawable, Positionable {
  setGroup(group: SpriteGroup): Sprite;
  unsetGroup(): Sprite;
}

export interface StaticSprite extends Sprite {
  setImage(image: any): StaticSprite;
}

export interface AnimatedSprite extends Sprite {
  addAnimation(key: string, animation: Animation): AnimatedSprite;
  playAnimation(key: string, frameNumber?: number): AnimatedSprite;
  removeAnimation(key: string): AnimatedSprite;
  stopAnimation(key: string, frameNumber?: number): AnimatedSprite;
}


