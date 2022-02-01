import MapManager from "../manager/mapmanager.js";
import { Nan, GameObject, Polygon, Transform, Vector, Rect } from "../../dist/nan.js";

export default class MapItem extends GameObject {
  bc = 50;
  height = 0;  
  constructor(name, transform, bc) {
    super(name, new Transform(transform.position, null, new Vector(Math.sqrt(bc * bc * 3) * 2, bc * 4)));
    this.bc = bc;
    this.collider = new Vector(this.bc * 3, this.bc * 3);
    this.phy = new Polygon(new Transform(this.transform.position, null, new Vector(this.bc * 4, this.bc * 4)), 6, "fill", "green");
    this.phy.lineColor = "red";
    this.phy.lineWidth = 5;    
  }

  update = () => {
    this.phy.offsetX = Math.sqrt(this.bc * this.bc * 3);
    this.phy.startAngles = Math.PI / 6;

    if (MapManager.instance.selected == this.name) {
      this.phy.lateUpdate = (obj) => {        
        obj.lineColor = "yellow";
        obj.render();
      }
    }
    else {
      this.phy.lineWidth = 2;
      this.setHeightColor();
      this.phy.lateUpdate = undefined;
    }        
    return [this.phy];
  }

  setHeightColor() {
    this.phy.lineColor = "red";
    this.phy.color = this.getColorByHeight();
  }

  getColorByHeight() {
    let maxHeight = MapManager.instance.maxHeight;
    let a = 255;
    let b = 255 - this.height / maxHeight * 136;
    let c = 255 - this.height / maxHeight * 255;
    let color = "rgb(" + a + "," + b + "," + c + ")"
    return color;
  }
}