import { Nan, Transform, Vector } from "../../dist/nan.js";
import MapItem from '../obj/mapitem.js';

export default class MapManager {
  heightCount = 0;
  widthCount = 0;
  startPos = new Vector(0, 0);
  selected = "";
  bc = 20;
  maxHeight = 1000;
  static instance = null;
  //   itemMap = {}

  constructor(heightCount, widthCount, startPos) {
    this.heightCount = heightCount;
    this.widthCount = widthCount;
    this.startPos = startPos;
    MapManager.instance = this;
  }


  init() {
    let nan = Nan.getInstance();
    for (let i = 0; i < this.widthCount; i++) {
      for (let j = 0; j < this.heightCount; j++) {
        let offsetX = j % 2 == 0 ? 0 : Math.sqrt(this.bc * this.bc * 3);
        let x = i * Math.sqrt(this.bc * this.bc * 3) * 2 + this.startPos.x;
        let y = j * this.bc * 3 + this.startPos.y;
        let obj = new MapItem("MapItem-" + i + "-" + j, new Transform(new Vector(x + offsetX, y)), this.bc);

        obj.onClick = () => {
          this.selected = obj.name;
          this.showMapItem();
        }

        nan.add(obj);
      }
    }
  }

  showMapItem() {
    let nan = Nan.getInstance();
    let obj = nan.findGameObject(MapManager.instance.selected);

    document.getElementById("name").textContent = "左侧选择的对象名称：" + this.selected;
    document.getElementById("height").value = obj.height;
  }

  changeMapItem() {
    let nan = Nan.getInstance();
    let mapManager = MapManager.instance;
    let obj = nan.findGameObject(MapManager.instance.selected);

    //Height
    let height = document.getElementById('height').value;

    if (height > mapManager.maxHeight) {
      alert("最大高度不能高于" + mapManager.maxHeight);
      height = mapManager.maxHeight;
    }
    obj.height = height;
    obj.setHeightColor();
  }
}