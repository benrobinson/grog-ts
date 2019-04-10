import {Level, LevelBehavior, LevelBehaviorNoop} from "./Level";
import {Entity, EntityManager} from "./Entity";
import {EventManager, Event} from "./Event";
import {Coords} from "./Util";
import {TickEvent} from "./Ticker";


export interface CollisionManager {
  level: Level;
  entityManager: EntityManager;
  eventManager: EventManager;
}

