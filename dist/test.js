import {Nan,NText,Transform,Vector,GameObject,NLine, Polygon, Sprite} from './nan.js';  
import MapItem from './obj/mapitem.js'

let nan = new Nan(document.getElementById('canvas'));    

let heightCount = 10;
let widthCount = 10;

for (let i = 0; i < widthCount; i++) {
  let obj = new MapItem("MapItem-"+i,new Transform(new Vector(i * 200, 0)));  
  obj.onClick = ()=> {
    console.log("我被点击");
  }
  nan.add(obj);  
}
console.log(nan.objList);

