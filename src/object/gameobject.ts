
import Transform from "utils/transform";
import Vector2 from "utils/vector";
import NanObject from "./nanobject";

export default class GameObject {
  public name: string;  
  public transfrom: Transform; 
  constructor(name: string, transform: Transform = new Transform(Vector2.zero,Vector2.zero,Vector2.one)) {
    if (!name) {
      console.error("You must create GameObject with param name, Such as new GameObject('Name')");      
    }
    this.name = name;
    this.transfrom = transform;
    this.init();
  }
  init() {}
  update(): NanObject[] | undefined {
    console.log("FUCK");
    return undefined
  }
} 