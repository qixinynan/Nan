import NanObject from "./nanobject";
import Transform from "utils/transform";

export default class NText extends NanObject {
  public text: string;
  public autoUpdateWidth: boolean = true;

  constructor(transform: Transform,text: string, color: string){
    super(transform);
    this.text = text;
  }

  _update(): void { 
    super._update();
    this.context.font = this.transform.size.y + "px serif";

    if (this.autoUpdateWidth) {
      var textMesure = this.context.measureText(this.text);
      this.transform.size.x = textMesure.width;
    }    
    this.context.fillText(this.text,this.transform.position.x,this.transform.position.y + this.transform.size.y );    
    super._lateUpdate();
  }
}