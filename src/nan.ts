import Vector from 'utils/vector';
import GameObject from 'object/gameobject';
import NanObject from 'object/nanobject'
import Sprite from 'object/sprite'

export default class Nan {  
    
  private context: CanvasRenderingContext2D; //Canvas渲染器
  private objList: Array<GameObject> = []; //已加载的物体列表
  private static instance:Nan; //单例
  private fps: number; //帧率
  private originPosition: Vector = new Vector(0, 0);
  public canvasDraggable: boolean = false; //画布可否拖拽

  private isDraging = false;
  private isMouseDown = false;

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
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;        
    canvas.onmouseup = this.clickEvent;
    canvas.onmousedown = this.mouseDown;
    this.fps = fps;
    this.init();
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
   * 初始化
   */
  init() {
    setInterval(this.update, 1000/this.fps);
  }

  /**
   * 每帧刷新  
   */
  update() {
    let nan = Nan.getInstance();
    nan.context.clearRect(nan.originPosition.x, nan.originPosition.y, nan.context.canvas.width, nan.context.canvas.height); //清屏
    for (let i = 0; i < nan.objList.length; i++) {
      let gameObj: GameObject = nan.objList[i];      
      let nanObjList: NanObject[] = gameObj.update() as NanObject[];      
      if (nanObjList) { 
        if (!nanObjList.length) { //若没有length对象便就断言不是array对象
          console.error("Function update() must return a array of GameObject");
        }
        for (let j = 0; j < nanObjList.length; j++) {
          const nanObj = nanObjList[j];
          nanObj._update();          
        }
      } 
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
    if(!obj.update()) {
      console.warn("The gameobject named %s hasn't return any NanObject in update()",obj.name);
    }   
    this.objList.push(obj);
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
    for (let i = 0; i < nan.objList.length ; i++) {
      const obj: GameObject = nan.objList[i];
      let xOffset = e.x - obj.transform.position.x - obj.colliderStartPos.x + nan.originPosition.x;
      let yOffset = e.y - obj.transform.position.y - obj.colliderStartPos.y + nan.originPosition.y;
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
      if (nan.canvasDraggable && nan.isMouseDown) {
        nan.isDraging = true;
        let dragX = e.clientX - lastPos.x;
        let dragY = e.clientY - lastPos.y;
        console.log(dragX,dragY);
        if (Math.abs(dragX) > 1 && Math.abs(dragY) > 1) {
          nan.translateOrigin(dragX, dragY);
          lastPos = new Vector(e.clientX, e.clientY);
        }                
      }
    }    
  }

  translateOrigin(x: number, y: number) {
    this.context.translate(x, y);
    this.originPosition = new Vector(this.originPosition.x - x,this.originPosition.y -y);    
  }

  moveOrigin(x: number, y: number) {    
    this.translateOrigin(this.originPosition.x + x, this.originPosition.y + y)
  }  

}