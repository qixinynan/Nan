/**
 * 二维数组
 */
export default class Vector<T> {
    x: T;
    y: T;
    constructor(x: T, y: T);
    static zero: Vector<number>;
    static one: Vector<number>;
}
