import { Nan, Transform, Vector } from "../nan.js";
import MapItem from '../obj/mapitem.js';

export default class MapManager {
  heightCount = 0;
  widthCount = 0;
  startPos = new Vector(0,0);
  selected = "";
  bc = 20;
  static instance = null;
//   itemMap = {}

  constructor(heightCount, widthCount,startPos) {
    this.heightCount = heightCount;
    this.widthCount = widthCount;
    this.startPos = startPos;
    MapManager.instance = this;
  }


  init() {
    let nan = Nan.getInstance();
    nan.setBc(this.bc);
    for (let i = 0; i < this.widthCount; i++) {
      for (let j = 0; j < this.heightCount; j++) {
        let offsetX = j % 2 == 0 ? 0 : Math.sqrt(this.bc*this.bc*3);
        let x = i * Math.sqrt(this.bc*this.bc*3) * 2 + this.startPos.x;
        let y = j * this.bc*3 + this.startPos.y;
        let obj = new MapItem("MapItem-"+i+"-"+j,new Transform(new Vector(x + offsetX, y)), this.bc);
        nan.itemMap[[i,j]] = obj;
        // console.log(nan.itemMap[[i, j]], nan.itemMap.get([i,j]))
        obj.onClick = ()=> {
          this.selected = obj.name;
          document.getElementById("name").textContent = "左侧选择的对象名称：" + this.selected;
        }

        nan.add(obj);
      }
    }
  }
}