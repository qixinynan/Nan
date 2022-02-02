/**
 * 二维数组
 */
export default class Vector<T> {
  x: T;

  y: T;

  constructor(x: T, y: T) {
    this.x = x;
    this.y = y;
  }

  static zero = new Vector(0, 0);

  static one = new Vector(1, 1);
}
