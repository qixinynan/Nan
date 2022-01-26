import Vector from 'utils/vector';
import GameObject from 'object/gameobject';
import NanObject from 'object/nanobject'
import Sprite from 'object/sprite'
import EventManager from 'event/eventmanager';

export default class Nan {

  private static instance: Nan; //单例
  private fps: number = 5; //帧率
  private eventManager: EventManager = new EventManager();

  public originPosition: Vector = new Vector(0, 0);
  public originScale: Vector = new Vector(1, 1);
  public context: CanvasRenderingContext2D; //Canvas渲染器
  public objList: Array<GameObject> = []; //已加载的物体列表
  public canvasDraggable: boolean = true; //画布可否可拖拽
  public canvasScalable: boolean = true; //画布是否可缩放
  public autoUpdate: boolean = true;
  public scale = 1;
  /**
   *  构造函数初始化
   * @param canvas Canvas对象
   * @param fps 刷新帧率
   */
  constructor(canvas: HTMLCanvasElement) {
    if (Nan.instance)
      console.error("Nan is already created, You can use getInstance() to get it");
    else
      Nan.instance = this;
    if (!canvas)
      console.error("Canvas can't be null")
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.init();
  }

  /**
 * 初始化
 */
  init() {
    this.eventManager.init();
    if (this.autoUpdate) {
      setInterval(this.update, 1000 / this.fps);
    }
  }

  /**
   * 获取单例
   * @returns 单例
   */
  static getInstance(): Nan {
    if (!Nan.instance) {
      console.error("Nan have not been create,Please create Nan first");
    }
    return Nan.instance;
  }

  /**
   * 获取Canvas渲染器
   * @returns Canvas渲染器
   */
  getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  // 清屏
  clear() {
    let nan = Nan.getInstance();
    let cleanX = nan.originPosition.x / nan.scale,
      cleanY = nan.originPosition.y / nan.scale,
      canvasWidth = nan.context.canvas.width,
      canvasHeight = nan.context.canvas.height;
    // console.log(cleanX, cleanY, canvasWidth, canvasHeight);
    nan.context.clearRect(cleanX, cleanY, canvasWidth / nan.originScale.x, canvasHeight / nan.originScale.y); //清屏
  }

  /**
   * 每帧刷新
   */
  update() {
    let nan = Nan.getInstance();
    let allNanObjList: NanObject[] = [];
    nan.clear();

    for (let i = 0; i < nan.objList.length; i++) {
      let gameObj: GameObject = nan.objList[i];
      gameObj.update();
    }
    for (let i = 0; i < allNanObjList.length; i++) {
      allNanObjList[i]._lateUpdate();
    }
    nan.lateUpdate();
  }

  /**
   * update执行后执行
   */
  lateUpdate() {
    let nan = Nan.getInstance();
    for (let i = 0; i < nan.objList.length; i++) {
      let gameObj: GameObject = nan.objList[i];
      gameObj.lateUpdate();
    }
  }

  /**
   * 添加GameObject对象
   * @param obj GameObject对象
   */
  add(obj: GameObject) {
    if (!obj.render) {
      console.warn("The gameobject named %s hasn't return any NanObject in render()", obj.name);
    }
    this.objList.push(obj);
  }

  /**
   * 查询Nan对象
   * @param name 名称
   * @returns Nan对象
   */
  findGameObject(name: string): GameObject | null {
    let result: GameObject | null = null;
    for (let i = 0; i < this.objList.length; i++) {
      let obj: GameObject = this.objList[i];
      if (obj.name == name) {
        result = obj;
      }
    }
    if (!result) {
      console.error("Can't find object by name: %s", name);
    }
    return result;
  }

  /**
   * 移动坐标原点并记录
   * @param x x
   * @param y y
   */
  translateOrigin(x: number, y: number) {
    this.context.translate(x, y);
    this.originPosition = new Vector(this.originPosition.x - x * this.scale, this.originPosition.y - y * this.scale);
    // console.log(x,y, this.originPosition.x, this.originPosition.y);
  }

  /**
   * 移动“到”坐标原点并记录
   * @param x x
   * @param y x
   */
  moveOrigin(x: number, y: number) {
    this.translateOrigin(this.originPosition.x + x, this.originPosition.y + y)
  }

  /**
   * 缩放画布
   * @param x x
   * @param y x
   */
  //TODO 以中心缩放
  scaleOrigin(x: number) {
    if (this.scale < 0.1 && x < 1) return;
    if (this.scale > 3 && x > 1) return;
    this.scale *= x;
    this.context.scale(x, x);
    this.originScale = new Vector(this.originScale.x * x, this.originScale.y * x)
  }
}