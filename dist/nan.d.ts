import Vector from './utils/vector';
import GameObject from './object/gameobject';
export default class Nan {
    private static instance;
    private fps;
    private eventManager;
    private lastUpdateTime;
    originPosition: Vector<number>;
    originScale: Vector<number>;
    context: CanvasRenderingContext2D;
    objList: Array<GameObject>;
    canvasDraggable: boolean;
    canvasScalable: boolean;
    autoUpdate: boolean;
    selectedObj: GameObject | undefined;
    scale: number;
    /**
     *  构造函数初始化
     * @param canvas Canvas对象
     * @param fps 刷新帧率
     */
    constructor(canvas: HTMLCanvasElement);
    /**
   * 初始化
   */
    init(): void;
    /**
     * 获取单例
     * @returns 单例
     */
    static getInstance(): Nan;
    /**
     * 获取Canvas渲染器
     * @returns Canvas渲染器
     */
    getContext(): CanvasRenderingContext2D;
    static clear(): void;
    /**
     * 更新
     */
    static update(): void;
    /**
     * update执行后执行
     */
    private static updated;
    /**
     * 渲染
     */
    static render(): boolean;
    /**
     * 添加GameObject对象
     * @param obj GameObject对象
     */
    add(obj: GameObject, autoUpdate?: boolean): void;
    /**
     * 查询Nan对象
     * @param name 名称
     * @returns Nan对象
     */
    findGameObject(name: string): GameObject | null;
    /**
     * 移动坐标原点并记录
     * @param x x
     * @param y y
     */
    translateOrigin(x: number, y: number): void;
    /**
     * 移动“到”坐标原点并记录
     * @param x x
     * @param y x
     */
    moveOrigin(x: number, y: number): void;
    /**
     * 缩放画布
     * @param x x
     * @param y x
     */
    scaleOrigin(x: number): void;
}
