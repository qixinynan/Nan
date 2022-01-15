import NanObject from "./nanobject";
import Transform from "utils/transform";

export default class NText extends NanObject {
  public text: string;
  public color: string;

  constructor(transform: Transform,text: string,color: string = "black"){
    super(transform);
    this.text = text;
    this.color = color;
  }

  _update(): void {
    super._update();    
    this.context.fillStyle = this.color;
    this.context.fillText(this.text,this.transform.position.x,this.transform.position.y);
  }
}