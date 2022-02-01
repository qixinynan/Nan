import NanObject from "./nanobject";
import Transform from "utils/transform";

export default class NText extends NanObject {
  public text: string;
  public color: string;
  public autoUpdateWidth: boolean = true;

  constructor(transform: Transform,text: string, color: string = "black"){
    super(transform);
    this.text = text;
    this.color = color;
  }

  async _update() { 
    this.context.save();
    this.context.beginPath();
    super._update();

    this.context.font = this.transform.size.y + "px serif";

    if (this.autoUpdateWidth) {
      var textMesure = this.context.measureText(this.text);
      this.transform.size.x = textMesure.width;
    }
    this.context.fillStyle = this.color;
    this.context.fillText(this.text,this.transform.position.x,this.transform.position.y + this.transform.size.y);        

    this.context.closePath();
    this.context.restore();
  }
}