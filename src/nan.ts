import GameObject from 'object/gameobject';
import NanObject from 'object/nanobject'
import Sprite from 'object/sprite'

export default class Nan {  
    
  private ctx: CanvasRenderingContext2D; //Canvas渲染器
  private objList: Array<GameObject> = []; //已加载的物体列表
  private static instance:Nan; //单例
  private fps: number; //帧率

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
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;    
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
  getCtx(): CanvasRenderingContext2D {
    return this.ctx;
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
    nan.ctx.clearRect(0, 0, nan.ctx.canvas.width, nan.ctx.canvas.height); //清屏
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
  }

  /**
   * 添加GameObject对象
   * @param obj GameObject对象
   */
  add(obj: GameObject) {   
    console.log("Add " + obj.name); 
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

}