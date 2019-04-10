import {EventManager, Event} from "./Event";
import {TickEvent} from "./Ticker";

export interface InputEvent extends Event {}

export interface Input {
  eventManager: EventManager;
}


