import Vector from './vector';
/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
export default class Transform {
  public position: Vector<number>; // 位置

  public rotation: Vector<number>; // 角度 (未实现)

  public size: Vector<number>; // 缩放

  constructor(position?: Vector<number>, rotation?: Vector<number>, size?: Vector<number>) {
    this.position = position || Vector.zero;
    this.rotation = rotation || Vector.zero;
    this.size = size || Vector.one;
  }
}
