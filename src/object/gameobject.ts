
import Transform from "utils/transform";
import Vector2 from "utils/vector";
import NanObject from "./nanobject";
/** 
* NanObject是Nan框架的基石。任何能够在Canvas上看得见的东西都应当是GameObject的派生类
*/
export default class GameObject {
  public name: string;  
  public transfrom: Transform; //变换信息  

  constructor(name: string, transform: Transform = new Transform(Vector2.zero,Vector2.zero,Vector2.one)) {
    if (!name) {
      console.error("You must create GameObject with param name, Such as new GameObject('Name')");      
    }
    this.name = name;
    this.transfrom = transform;
    this.init();
  }
  init() {}

  /**
   * Update会在每帧调用一次
   * 
   * Update应当返回一个NanObject的列表
   * @returns NanObject[]
   */
  update(): NanObject[] | undefined {    
    return undefined
  }
} 