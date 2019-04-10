import {Drawable, DrawableGroup} from "./Drawable";
import {Moveable} from "./Moveable";
import {Positionable} from "./Positionable";
import {Sizeable} from "./Sizeable";
import {Updateable} from "./Updateable";
import {SpriteGroup} from "./Sprite";


export interface Entity extends Drawable, Moveable, Positionable, Sizeable, Updateable {
  hide(): Entity;
  show(): Entity;
  withSpriteGroup(spriteGroup: SpriteGroup): Entity;
}

export interface EntityManager {
  entities: Set<Entity>;
  drawableGroup: DrawableGroup;

  getEntities(): Set<Entity>;
  add(entity: Entity): EntityManager;
  remove(entity: Entity): EntityManager;
  removeAll(): EntityManager;
}
