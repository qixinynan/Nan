import NanObject from "./nanobject";
import Transform from "utils/transform";

export default class NText extends NanObject {
  public text: string;

  constructor(name: string,transform: Transform,text: string){
    super(name,transform);
    this.text = text;
  }

  _update(): void {
    super._update();    
    this.ctx.fillText(this.text,this.transform.position.x,this.transform.position.y);
  }
}