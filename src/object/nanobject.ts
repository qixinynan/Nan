import { Transform } from "utils/transform";
import { Nan } from "../nan"
export class NanObject {
  public name: String;
  public transform: Transform;
  public update: Function | any;
  public state: Object | any;
  protected ctx: CanvasRenderingContext2D;

  constructor (name:String,transform:Transform) {
      this.name = name;
      this.transform = transform;
      this.ctx = Nan.getInstance().getCtx();
  }
  _update() {
    if(this.update){
      this.update(this);
    }
  }
}