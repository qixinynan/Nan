import Transform from "utils/transform";
import Nan from "../nan"
/**
 * NanObject是GameObject框架的基石。是GameObject每次Update返回给Nan的就是NanObject的列表
 */
export default class NanObject {  
  public transform: Transform; //变换信息  
  public update: Function | undefined; //外部帧更新逻辑
  public state: Object | undefined; //状态，保存当前NanObject的变量等
  protected context: CanvasRenderingContext2D; //一般为Nan单例中的ctx
  public init: Function | undefined; //外部初始化逻辑
  
  /**
   * 构造初始化   
   * @param transform 变换信息
   */
  constructor (transform:Transform) {      
      this.transform = transform;
      this.context = Nan.getInstance().getContext();            
  }

  /**
   * 如果Init方法已被赋值，则执行Init方法
   * 或者你也可以直接在此传入Init。doInit()会自动帮你对init进行赋值
   */
  doInit(init?: Function) {
    if (init)
      this.init = init;
    if (this.init) 
      this.init(this);    
  }
  /**
   * 内部帧更新函数
   */
  _update() {
    if(this.update) {
      this.update(this);
    }
  }
}