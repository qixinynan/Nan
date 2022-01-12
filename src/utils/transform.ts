import { Vector2 } from "./vector";
/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
export class Transform {
    position:Vector2; //位置
    rotation:Vector2; //角度 (未实现)
    
    constructor(position:Vector2,rotation:Vector2) {
      this.position = position;
      this.rotation = rotation;
    }

    static zero: Transform = new Transform(new Vector2(0,0),new Vector2(0,0));
  }