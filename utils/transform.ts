import { Vector2 } from "./vector";
export class Transform {
    position:Vector2;
    rotation:Vector2;
    constructor(position:Vector2,rotation:Vector2) {
      this.position = position;
      this.rotation = rotation;
    }
  }