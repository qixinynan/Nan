import Vector from 'utils/vector';
import GameObject from 'object/gameobject';
import NanObject from 'object/nanobject'
import Sprite from 'object/sprite'

export default class Nan {

  private context: CanvasRenderingContext2D; //Canvas渲染器
  private objList: Array<GameObject> = []; //已加载的物体列表
  private objMap = new Map(); //已加载的物体列表
  private static instance:Nan; //单例
  private fps: number; //帧率
  private originPosition: Vector = new Vector(0, 0);
  private originScale: Vector = new Vector(1, 1);
  public canvasDraggable: boolean = false; //画布可否拖拽
  public canvasScalable: boolean = false; //FIXME 放大后不停拖拽移动位置后再缩小会有严重渲染错误
  public extraCleanRect:Vector =  new Vector(0,0); //额外擦除区域

  private isDraging = false;
  private isMouseDown = false;
  public bc = 20;
  public itemMap = new Map(); //已加载的物体列表

  /**
   *  构造函数初始化
   * @param canvas Canvas对象
   * @param fps 刷新帧率
   */
  constructor(canvas: HTMLCanvasElement, fps: number = 60) {
    if (Nan.instance)
      console.error("Nan is already created, You can use getInstance() to get it");
    else
      Nan.instance = this;
    if (!canvas)
      console.error("Canvas can't be null")
    this.fps = fps;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.init();
  }

  setBc(bc: number) {
    this.bc = bc;
    console.log(this.bc);
  }

  getBc() {
    return this.bc;
  }
    /**
   * 初始化
   */
  init() {
    this.registerEvent();
    setInterval(this.update, 1000/this.fps);
  }

  /**
   * 事件注册
   */
  private registerEvent() {
    let canvas: HTMLCanvasElement = Nan.getInstance().context.canvas;
    canvas.onmouseup = this.clickEvent;
    canvas.onmousedown = this.mouseDown;
    canvas.onwheel = this.onWheel;
    canvas.oncontextmenu = function(e) {
      e.preventDefault();
    }
  }

  /**
   * 获取单例
   * @returns 单例
   */
  static getInstance(): Nan {
    if(!Nan.instance) {
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

  /**
   * 每帧刷新
   */
  update() {
    let nan = Nan.getInstance();
    let allNanObjList: NanObject[] = [];
    let cleanX = nan.originPosition.x,
        cleanY = nan.originPosition.y,
        canvasWidth = nan.context.canvas.width,
        canvasHeight = nan.context.canvas.height;
    nan.context.clearRect(cleanX, cleanY, canvasWidth / nan.originScale.x  + nan.extraCleanRect.x, canvasHeight / nan.originScale.y  + nan.extraCleanRect.y); //清屏
    for (let i = 0; i < nan.objList.length; i++) {
      let gameObj: GameObject = nan.objList[i];
      let nanObjList: NanObject[] = gameObj.update() as NanObject[];
      if (nanObjList) {
        if (!nanObjList.length) { //若没有length对象便就断言不是array对象
          console.error("Function update() must return a array of GameObject");
        }
        for (let j = 0; j < nanObjList.length; j++) {
          const nanObj = nanObjList[j];
          allNanObjList.push(nanObj);
          nanObj._update();
        }
      }
    }
    for (let i = 0; i < allNanObjList.length; i++) {
      allNanObjList[i]._lateUpdate();
    }
    nan.lateUpdate();
    nan.context.rect(cleanX, cleanY, canvasWidth / nan.originScale.x  + nan.extraCleanRect.x, canvasHeight / nan.originScale.y  + nan.extraCleanRect.y); //清屏
    nan.context.stroke();
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
    if(!obj.update()) {
      console.warn("The gameobject named %s hasn't return any NanObject in update()",obj.name);
    }
    this.objList.push(obj);
    this.objMap.set(obj.name, obj);
  }

  /**
   * 查询Nan对象
   * @param name 名称
   * @returns Nan对象
   */
  findGameObject(name: string): GameObject | null {
    let result:GameObject | null = null;
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

  findGameObject1(name: string): GameObject | null {
    let result:GameObject | null = null;
    result = this.objMap.get(name);
    if (!result) {
      console.error("Can't find object by name: %s", name);
    }
    return result;
  }
  /**
   * 点击事件处理
   */
  clickEvent(e: MouseEvent) {
    let nan = Nan.getInstance();
    nan.isMouseDown = false;
    if(nan.isDraging) {
      nan.isDraging = false;
      return;
    }
    var canvasBound = nan.context.canvas.getBoundingClientRect()
    let x = e.clientX - canvasBound.left;
    let y = e.clientY - canvasBound.top;
    let j = Math.floor(y/3/nan.bc);
    let offsetX = j % 2 == 0 ? 0 : Math.sqrt(nan.bc*nan.bc*3);
    let i = (x-offsetX)/2;
    i = Math.floor(i/Math.sqrt(nan.bc*nan.bc*3));
    let key = [i,j]
    console.log(key, x, y, nan.bc);
    let obj = nan.itemMap[key];
    // console.log(key, nan.itemMap.has(key), obj, nan.itemMap)
    if(obj && obj.onClick){
        obj.onClick();
    }
  }

  clickEvent1(e: MouseEvent) {
    let nan = Nan.getInstance();
    nan.isMouseDown = false;
    if(nan.isDraging) {
      nan.isDraging = false;
      return;
    }
    for (let i = 0; i < nan.objList.length ; i++) {
      const obj: GameObject = nan.objList[i];
      var canvasBound = nan.context.canvas.getBoundingClientRect()
      let x = e.clientX - canvasBound.left;
      let y = e.clientY - canvasBound.top;
      let xOffset = x - obj.transform.position.x - obj.colliderStartPos.x + nan.originPosition.x;
      let yOffset = y - obj.transform.position.y - obj.colliderStartPos.y + nan.originPosition.y;
      if (0 <= xOffset && xOffset <= obj.collider.x && 0 <= yOffset && yOffset <= obj.collider.y) {
        if (obj.onClick) {
          obj.onClick();
        }
      }
    }
  }
  /**
   * 按下事件处理
   */
   //TODO client坐标在canvas坐标变更后可能失效
  mouseDown(de: MouseEvent) {
    let nan = Nan.getInstance();
    let canvas = nan.getContext().canvas;
    let lastPos = new Vector(de.clientX, de.clientY);
    nan.isMouseDown = true;
    canvas.onmousemove = (e: MouseEvent) => {
      if (nan.isMouseDown) {
        if (nan.canvasDraggable && (e.buttons == 2 || e.buttons == 4)) {
          nan.isDraging = true;

          var canvasBound = nan.context.canvas.getBoundingClientRect()
          let x = e.clientX - canvasBound.left;
          let y = e.clientY - canvasBound.top;

          let dragX = e.clientX - lastPos.x;
          let dragY = e.clientY - lastPos.y;

          nan.translateOrigin(dragX, dragY);
          lastPos = new Vector(e.clientX, e.clientY);
        }
      }
    }
    canvas.onmouseout = () => {
      nan.isMouseDown = false;
      if(nan.isDraging) {
        nan.isDraging = false;
      }
    }
  }

  /**
   * 监听滚轮事件
   * 缩放功能
   */
  onWheel(e: WheelEvent) {

    let nan = Nan.getInstance();

    if (e.deltaY > 0) {
      nan.scaleOrigin(0.8,0.8)
    }
    else {
      nan.scaleOrigin(1.2,1.2)
    }
  }

  /**
   * 移动坐标原点并记录
   * @param x x
   * @param y y
   */
  translateOrigin(x: number, y: number) {
    this.context.translate(x, y);
    this.originPosition = new Vector(this.originPosition.x - x,this.originPosition.y -y);
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
  scaleOrigin(x: number, y: number) {
    // context.translate((_left + _width/2) - (_width / 2) * scale, (_top + _height/2)  - (_height / 2) * scale);
    let cWidth = this.context.canvas.width;
    let cHeight = this.context.canvas.height;
    this.bc = this.bc * x;
    // this.translateOrigin(cWidth / 4, cHeight / 4)
    // this.translateOrigin((cWidth + this.originPosition.x)/2,(cHeight + this.originPosition.y))
    this.context.scale(x, y);
    this.originScale = new Vector(this.originScale.x * x, this.originScale.y * y)
    console.log(this.originScale, this.bc);;
  }

}