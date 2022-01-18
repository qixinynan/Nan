import { Nan, Transform, Vector } from "../nan.js";
import MapItem from '../obj/mapitem.js';

export default class MapManager {
  heightCount = 0;
  widthCount = 0;
  startPos = new Vector(0,0);
  selected = "";
  static instance = null;

  constructor(heightCount, widthCount,startPos) {
    this.heightCount = heightCount;
    this.widthCount = widthCount;
    this.startPos = startPos;
    MapManager.instance = this;
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
          this.selected = obj.name;
          document.getElementById("name").textContent = "左侧选择的对象名称：" + this.selected;
        }

        nan.add(obj);
      }
    }
  }
}