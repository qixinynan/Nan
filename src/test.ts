import { NanObject } from "object/nanobject";
import { Nan } from "./nan";
import { Sprite } from "./object/sprite";
import { Transform } from "./utils/transform";
import { Vector2 } from "./utils/vector";

const canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let nan:Nan = new Nan(canvas);

let img:CanvasImageSource = new Image();
img.src = 'a.png';
img.onload = ()=>{
  let sprite:Sprite = new Sprite("Hello123",new Transform(new Vector2(0,0),new Vector2(0,0)),img);
  sprite.update = (obj:NanObject)=>{
    console.log("I'm being rendered!!!",obj);        
    obj.transform.position.x += 50;      
  }
  Nan.getInstance().addObject(sprite);
} 
