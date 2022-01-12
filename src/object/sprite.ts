import { NanObject } from "./nanobject";
import { Transform } from "utils/transform";
/**
 * Sprite类
 * 渲染图片的对象都属于Sprite类，Sprite类属于Nan对象
 */
export class Sprite extends NanObject {  
  public image: CanvasImageSource; //图像

  /**
   * 构造函数
   * @param name 对象名称
   * @param transform 变换信息
   * @param image 图像
   */
  constructor(name: string,transform: Transform,image: CanvasImageSource){
    super(name,transform);
    this.image = image;
  }

  /**
   * 内部帧更新函数
   */
  _update(): void {
    super._update();    
    this.ctx.drawImage(this.image,this.transform.position.x,this.transform.position.y);
  }

  /**
   * 设置图像
   * @param image 图像
   */
  setImage(image:CanvasImageSource) {
    this.image = image;
  }
}