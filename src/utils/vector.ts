/**
 * 二维数组
 */
export default class Vector2 {
    x:number;
    y:number;

    constructor(x:number, y:number) {
      this.x = x;
      this.y = y;
    }

    static zero = new Vector2(0,0);
    static one = new Vector2(1,1);
  }
  