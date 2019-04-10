import {DrawingOutput} from "../api/DrawingOutput";
import {Sprite, SpriteGroup} from "../api/Sprite";

export class DefaultSpriteGroup implements SpriteGroup {

  private sprites: {
    [key: string]: Sprite
  } = {};
  public spriteLayers: string[] = [];
  public x: number;
  public y: number;
  private isShown: boolean = true;

  position = (x: number, y: number): SpriteGroup => {
    this.x = x;
    this.y = y;
    return this;
  };

  draw = (output: DrawingOutput): SpriteGroup => {
    for (let layer = 0; layer < this.spriteLayers.length; layer++) {
      this.sprites[this.spriteLayers[layer]].draw(output);
    }
    return this;
  };

  addSprite = (key: string, sprite: Sprite): SpriteGroup => {
    this.spriteLayers.push(key);
    this.sprites[key] = sprite;
    this.sprites[key].setGroup(this);
    return this;
  };

  removeSprite = (key: string): SpriteGroup => {
    this.spriteLayers.filter(k => k !== key);
    this.sprites[key].unsetGroup();
    delete this.sprites[key];
    return this;
  };

}
