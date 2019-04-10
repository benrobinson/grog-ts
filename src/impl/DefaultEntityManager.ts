import {DrawableGroup} from "../api/Drawable";
import {Entity, EntityManager} from "../api/Entity";

export class DefaultEntityManager implements EntityManager {
  private entities: Set<Entity> = new Set();
  private drawableGroup: DrawableGroup;

  constructor(drawableGroup: DrawableGroup) {
    this.drawableGroup = drawableGroup;
  }

  getEntities(): Set<Entity> {
    return this.entities;
  }

  add(entity: Entity): EntityManager {
    this.entities.add(entity);
    this.drawableGroup.add(entity);
    return this;
  }

  remove(entity: Entity): EntityManager {
    this.entities.delete(entity);
    this.drawableGroup.remove(entity);
    return this;
  }

  removeAll(): EntityManager {
    this.entities.clear();
    this.drawableGroup.removeAll();
    return this;
  }
}
