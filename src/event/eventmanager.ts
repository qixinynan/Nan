import EventMouse from './event_mouse';

export default class EventManager {
  public eventMouse!: EventMouse;

  public init() {
    this.eventMouse = new EventMouse();
  }
}
