import { NanObject } from "object/nanobject";
import { Nan } from "./nan";
import { Sprite } from "./object/sprite";
import { Transform } from "./utils/transform";
import { Vector2 } from "./utils/vector";

//获取Canvas
const canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

//实例化Nan 
let nan:Nan = new Nan(canvas,60); //设置每秒60帧
//创建与读取图片
let img:CanvasImageSource = new Image();
img.src = 'a.png';
img.onload = ()=>{
  let sprite:Sprite = new Sprite("Hello123",new Transform(new Vector2(0,0),new Vector2(0,0)),img);
  sprite.update = (obj:NanObject)=>{ //update会在每一帧执行一次
    console.log("I'm being rendered!!!",obj);        
    obj.transform.position.x += 1;  //移动物体位置     
  }

  //你完全可以将这里的Nan.getInstance()替换为上面所实例化的nan。这里只是为展示Nan是单例的
  Nan.getInstance().addObject(sprite);  //将创建的对象移交给Nan渲染
} 

//绑定按钮事件
const btn:HTMLButtonElement = document.getElementById("btn") as HTMLButtonElement;
btn.onclick = ()=>{
  //查询对象
  let obj:NanObject = Nan.getInstance().findObject("Hello123") as NanObject;
  obj.transform.position.x = 0; //移动物体位置 
}
