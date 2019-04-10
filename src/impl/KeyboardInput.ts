import {EventManager} from "../api/Event";
import {TickEvent} from "../api/Ticker";
import {Input, InputEvent} from "../api/Input";

class KeyUpEvent implements InputEvent {
  public static key = 'KeyUpEvent';
  public key = KeyUpEvent.key;
  public readonly code: number;

  constructor(code: number) {
    this.code = code;
  }
}

class KeyDownEvent implements InputEvent {
  public static key = 'KeyDownEvent';
  public key = KeyDownEvent.key;
  public readonly code: number;

  constructor(code: number) {
    this.code = code;
  }
}

class KeyPressEvent implements InputEvent {
  public static key = 'KeyPressEvent';
  public key = KeyPressEvent.key;
  public readonly code: number;

  constructor(code: number) {
    this.code = code;
  }
}

export class KeyboardInput implements Input {
  private eventManager: EventManager;
  private keysPressed: {
    [key: number]: boolean
  } = {};

  constructor(eventManager: EventManager) {
    this.eventManager = eventManager;
    this.eventManager.subscribe(KeyDownEvent.key, (keyDownEvent: KeyDownEvent) => { this.keysPressed[keyDownEvent.code] = true; });
    this.eventManager.subscribe(KeyUpEvent.key, (keyUpEvent: KeyUpEvent) => { this.keysPressed[keyUpEvent.code] = false; });
    this.eventManager.subscribe(TickEvent.key, (tickEvent: TickEvent) => {
      Object.keys(this.keysPressed).forEach(keyPressed => this.eventManager.publish(new KeyPressEvent(parseInt(keyPressed))));
    });
    window.addEventListener('keyup', (e: KeyboardEvent) => this.eventManager.publish(new KeyUpEvent(e.keyCode)));
    window.addEventListener('keydown', (e: KeyboardEvent) => this.eventManager.publish(new KeyDownEvent(e.keyCode)));
  }
}
