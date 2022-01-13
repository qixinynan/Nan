/**
 * 二维数组
 */
export default class Vector {
    x:any;
    y:any;

    constructor(x:any, y:any) {
      this.x = x;
      this.y = y;
    }

    static zero = new Vector(0,0);
    static one = new Vector(1,1);
}
  