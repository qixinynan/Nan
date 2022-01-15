import { Nan, Transform, Vector } from "../nan.js";
import MapItem from '../obj/mapitem.js';

export default class MapManager {
  heightCount = 0;
  widthCount = 0;
  startPos = new Vector(0,0)
  
  constructor(heightCount, widthCount,startPos) {
    this.heightCount = heightCount;
    this.widthCount = widthCount;
    this.startPos = startPos;
  }

  init() {
    let nan = Nan.getInstance();
    for (let i = 0; i < this.widthCount; i++) {
      for (let j = 0; j < this.heightCount; j++) {        
        let offsetX = j % 2 == 0 ? 0 : Math.sqrt(7500);
        let x = i * Math.sqrt(7500) * 2 + this.startPos.x;
        let y = j * 150 + this.startPos.y;
        let obj = new MapItem("MapItem-"+i+"-"+j,new Transform(new Vector(x + offsetX, y))); 
        obj.onClick = ()=> {
          console.log("我被点击");
          obj.phy.lineWidth = 10;    
          obj.phy.color = "red";
        }

        nan.add(obj);   
      }      
    }
  }
}