import {DrawableGroup} from "../api/Drawable";
import {Bounds, Coords, Velocity} from "../api/Util";
import {Sprite, SpriteGroup} from "../api/Sprite";
import {DrawingOutput} from "../api/DrawingOutput";
import {Update} from "../api/Updateable";
import {Entity} from "../api/Entity";

export class DefaultEntity implements Entity {

  public drawableGroup: DrawableGroup;
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public velocity: Velocity = {
    x: 0,
    y: 0
  };

  private offsetX: number = 0;
  private offsetY: number = 0;
  private isShown: boolean = true;
  private spriteGroup: SpriteGroup;

  constructor(spriteGroup: SpriteGroup) {
    this.spriteGroup = spriteGroup;
  }

  withSpriteGroup(spriteGroup: SpriteGroup): Entity {
    this.spriteGroup = spriteGroup;
    return this;
  }

  boundOffsetX(offsetX: number): Entity {
    this.offsetX = offsetX;
    return this;
  }

  boundOffsetY(offsetY: number): Entity {
    this.offsetY = offsetY;
    return this;
  }

  getBounds(): Bounds {
    return this.getBoundsFromCoords(this.x, this.y);
  }

  getBoundsFromCoords(x: number, y: number): Bounds {
    return {
      left: x + this.offsetX,
      right: x + this.offsetX + this.width,
      top: y + this.offsetY,
      bottom: y + this.offsetY + this.height
    };
  }

  getCenterCoords(): Coords {
    return {
      x: (this.x + this.offsetX) + (this.width / 2),
      y: (this.y + this.offsetY) + (this.height / 2)
    }
  }

  changeVelocityX(amount: number): Entity {
    this.velocity.x += amount;
    return this;
  }

  changeVelocityY(amount: number): Entity {
    this.velocity.y += amount;
    return this;
  }

  setVelocityX(xSpeed: number): Entity {
    this.velocity.x = xSpeed;
    return this;
  }

  setVelocityY(ySpeed: number): Entity {
    this.velocity.y = ySpeed;
    return this;
  }

  show(): Entity {
    this.isShown = true;
    return this;
  }

  hide(): Entity {
    this.isShown = false;
    return this;
  }

  draw(output: DrawingOutput): Entity {
    if (!this.isShown) return this;

    this.spriteGroup.position(this.x, this.y);
    this.spriteGroup.draw(output);
  }

  position(x: number, y: number): Entity {
    this.x = x;
    this.y = y;
    return this;
  }

  update(update: Update, deltaTime: number): Entity {
    update(this, deltaTime);
    return this;
  }

  addSprite = (key: string, sprite: Sprite): Entity => {
    this.spriteGroup.addSprite(key, sprite);
    return this;
  };

  removeSprite = (key: string): Entity => {
    this.spriteGroup.removeSprite(key);
    return this;
  };
}
