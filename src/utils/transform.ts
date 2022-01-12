import { Vector2 } from "./vector";
/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
export class Transform {
    position:Vector2 = Vector2.zero; //位置
    rotation:Vector2 = Vector2.zero; //角度 (未实现)
    scale:Vector2 = Vector2.zero; //缩放
    constructor(position: Vector2,rotation: Vector2,scale: Vector2) {
      this.position = position;
      this.rotation = rotation;
      this.scale = scale;
    }    
  }