import {Nan,NText,Transform,Vector,GameObject,NLine, Polygon} from './nan.js';  
import MapItem from './obj/mapitem.js';

let nan = new Nan(document.getElementById('canvas'));    

let heightCount = 10;
let widthCount = 10;

for (let i = 0; i < widthCount; i++) {
  nan.add(new MapItem("Name",new Transform(new Vector(i * 200, 0))));
}
console.log(nan.objList);

