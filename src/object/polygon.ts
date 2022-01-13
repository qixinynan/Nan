import Transform from "utils/transform";
import NanObject from "./nanobject";

export default class Polygon extends NanObject{
  
  public angles: number; 
  public renderMethod: string;
  public color: string;
  public radius: number;

  // 启始角度 （弧度制）
  public startAngles: number = 0;
  // 描边颜色
  public lineColor: string;
  // 描边像素
  public lineWidth: number = 1;

  /**
   * 多边形
   * @param transform 变换信息
   * @param angles 边数
   * @param radius 半径
   * @param renderMethod 绘制方法 fill为实心 stroke为描边
   * @param color 颜色
   */
  constructor(transform: Transform, angles: number, radius:number ,renderMethod: string = "fill", color: string = "#000000"){
    super(transform);
    this.angles = angles;
    this.renderMethod = renderMethod;
    this.color = color;
    this.radius = radius;    
    this.lineColor = color;
  }

  _update(): void {
    super._update();    
    this.context.strokeStyle = this.lineColor;
    this.context.lineWidth = this.lineWidth;
    this.context.beginPath();
    let ang: number = 2 * Math.PI / this.angles;

    for (let i = 0; i < this.angles ; i++) {

      let x:number = Math.cos(ang * i + this.startAngles) * this.radius + this.radius;
      let y:number = Math.sin(ang * i + this.startAngles) * this.radius + this.radius;
      console.log(this.radius,x,y);
      this.context.lineTo(x,y);      
    }

    this.context.closePath();
    
    switch (this.renderMethod) {
      case "fill":
        this.context.fillStyle = this.color;        
        this.context.fill();
        break;
      case "stroke":        
        this.context.strokeStyle = this.color;
        this.context.stroke();
        break;
      default:
        console.error("Unknow render way: %s", this.renderMethod);  
    }
    
  }
}