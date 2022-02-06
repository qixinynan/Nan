/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import { Nan, Transform, Vector,GameObject } from '../../dist/nan.js';
// eslint-disable-next-line import/no-cycle
import MapItem from '../obj/mapitem.js';

export default class MapManager {
  heightCount = 0;

  widthCount = 0;

  startPos = new Vector(0, 0);

  selected = '';

  bc = 20;

  maxHeight = 1000;

  static instance = null;

  constructor(heightCount, widthCount, startPos) {
    this.heightCount = heightCount;
    this.widthCount = widthCount;
    this.startPos = startPos;
    MapManager.instance = this;
  }

  init() {
    const nan = Nan.getInstance();
    let obj1;
    let obj2;

    for (let i = 0; i < this.widthCount; i += 1) {
      for (let j = 0; j < this.heightCount; j += 1) {
        const offsetX = j % 2 === 0 ? 0 : Math.sqrt(this.bc * this.bc * 3);
        const x = i * Math.sqrt(this.bc * this.bc * 3) * 2 + this.startPos.x;
        const y = j * this.bc * 3 + this.startPos.y;
        const obj = new MapItem(`MapItem-${i}-${j}`, new Transform(new Vector(x + offsetX, y)), this.bc);

        obj.onClick = () => {
          this.selected = obj.name;
          this.showMapItem();
          Nan.render();
        };

        nan.add(obj);
        if(i==0 && j==0){
          obj1 = obj;
        }else if(i==this.widthCount-1 && j==this.heightCount-1){
          obj2 = obj;
        }
      }
    }
    nan.setBoundaryObj(obj1, obj2);
    Nan.update();
  }

  showMapItem() {
    const nan = Nan.getInstance();
    const obj = nan.findGameObject(MapManager.instance.selected);

    document.getElementById('name').textContent = `左侧选择的对象名称：${this.selected}`;
    document.getElementById('height').value = obj.height;
  }

  static changeMapItem() {
    const nan = Nan.getInstance();
    const mapManager = MapManager.instance;
    const obj = nan.findGameObject(MapManager.instance.selected);

    // Height
    let height = document.getElementById('height').value;

    if (height > mapManager.maxHeight) {
      alert(`最大高度不能高于${mapManager.maxHeight}`);
      height = mapManager.maxHeight;
    }
    obj.height = height;
    obj.setHeightColor();
    Nan.render();
  }
}
