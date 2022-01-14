import NanObject from "./nanobject";
import Transform from "../utils/transform";
import Vector2 from "../utils/vector";

/**
 * Sprite类
 * 渲染图片的对象都属于Sprite类，Sprite类属于Nan对象
 */
export default class Sprite extends NanObject {  
  public image: CanvasImageSource; //图像
  public size: Vector2;
  /**
   * 构造函数
   * @param name 对象名称
   * @param transform 变换信息
   * @param image 图像
   */
  constructor(name: string,transform: Transform,image: CanvasImageSource, size?: Vector2){
    super(name,transform);
    this.image = image;
    if (!size) 
      this.size = new Vector2(image.width as number,image.height as number);    
    else
      this.size = size;
  }

  /**
   * 内部帧更新函数
   */
  _update(): void {
    super._update();    
    this.ctx.drawImage(
      this.image,
      this.transform.position.x,
      this.transform.position.y,
      this.size.x * this.transform.scale.x,
      this.size.y * this.transform.scale.y
    );
  }

  /**
   * 设置图像
   * @param image 图像
   */
  setImage(image:CanvasImageSource) {
    this.image = image;
  }
}