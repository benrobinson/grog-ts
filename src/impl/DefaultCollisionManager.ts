import {Entity, EntityManager} from "../api/Entity";
import {Event, EventManager} from "../api/Event";
import {Level, LevelBehavior, LevelBehaviorNoop} from "../api/Level";
import {Coords} from "../api/Util";
import {TickEvent} from "../api/Ticker";
import {CollisionManager} from "../api/Collisions";

export class DefaultCollisionManager implements CollisionManager{

  private entityManager: EntityManager;
  private eventManager: EventManager;
  private level: Level;


  constructor(entityManager: EntityManager, eventManager: EventManager, level: Level) {
    this.entityManager = entityManager;
    this.eventManager = eventManager;
    this.level = level;
  }

  private checkEntityEntityCollision(entityA: Entity, entityB: Entity) {
    const boundsA = entityA.getBounds();
    const boundsB = entityB.getBounds();

    if ((boundsA.bottom > boundsB.top && boundsA.bottom < boundsB.bottom && boundsA.right > boundsB.left && boundsA.right < boundsB.right) ||
      (boundsA.bottom > boundsB.top && boundsA.bottom < boundsB.bottom && boundsA.left > boundsB.left && boundsA.left < boundsB.right) ||
      (boundsA.top > boundsB.bottom && boundsA.top < boundsB.top && boundsA.right > boundsB.left && boundsA.right < boundsB.right) ||
      (boundsA.top > boundsB.bottom && boundsA.top < boundsB.top && boundsA.left > boundsB.left && boundsA.left < boundsB.right)) {
      this.eventManager.publish(new EntityEntityCollisionEvent(entityA, entityB));
    }
  }

  checkEntityEntityCollisions() {
    const entities = Array.from(this.entityManager.getEntities());
    for (let i = 0; i < entities.length; i++) {
      for (let k = i + 1; k < entities.length; k++) {
        this.checkEntityEntityCollision(entities[i], entities[k]);
      }
    }
  }

  private checkEntityLevelCollision(entity: Entity, deltaTime: number) {
    const nextCoords: Coords = {
      x: entity.x + (entity.velocity.x * deltaTime),
      y: entity.y + (entity.velocity.y * deltaTime)
    };
    const currBounds = entity.getBounds();
    const nextBounds = entity.getBoundsFromCoords(nextCoords.x, nextCoords.y);
    let checkX = 0;
    let checkY = 0;

    if (entity.velocity.x > 0) {
      checkX = nextBounds.right;
    } else if (entity.velocity.x < 0) {
      checkX = nextBounds.left;
    }

    if (entity.velocity.y > 0) {
      checkY = nextBounds.bottom;
    } else if (entity.velocity.y < 0) {
      checkY = nextBounds.top;
    }

    this.eventManager.publish(new EntityLevelCollisionEvent(entity, 'x', this.level.getBehavior(checkX, checkY)));
    this.eventManager.publish(new EntityLevelCollisionEvent(entity, 'y', this.level.getBehavior(checkX, checkY)));
  };

  checkEntityLevelCollisions() {
    this.eventManager.subscribe(TickEvent.key, (deltaTime: number) => {
      this.entityManager.getEntities().forEach(entity => {
        this.checkEntityLevelCollision(entity, deltaTime);
      });
    });
  }
}

export class EntityEntityCollisionEvent implements Event {
  static key = 'EntityEntityCollision';
  public key = EntityEntityCollisionEvent.key;

  private entityA: Entity;
  private entityB: Entity;

  constructor(entityA: Entity, entityB: Entity) {
    this.entityA = entityA;
    this.entityB = entityB;
  }
}

export class EntityLevelCollisionEvent implements Event {
  static key = 'EntityLevelCollision';
  public key = EntityLevelCollisionEvent.key;

  private entity: Entity;
  private behavior: LevelBehavior;
  private axisKey: string;

  constructor(entity: Entity, axisKey: string = 'x', behavior: LevelBehavior = LevelBehaviorNoop) {
    this.entity = entity;
    this.behavior = behavior;
    this.axisKey = axisKey;
  }
}
