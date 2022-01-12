import { NanObject } from "./nanobject";
import { Transform } from "utils/transform";
export class Sprite extends NanObject {  
  public sprite: CanvasImageSource; 

  constructor(name:String,transform:Transform,sprite:CanvasImageSource){
    super(name,transform);
    this.sprite = sprite;
  }
  _update(): void {
    super._update();    
    this.ctx.drawImage(this.sprite,this.transform.position.x,this.transform.position.y);
  }

  setSprite(sprite:CanvasImageSource) {
    this.sprite = sprite;
  }
}