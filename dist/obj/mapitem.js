import MapManager from "../manager/mapmanager.js";
import { GameObject, Polygon, Transform, Vector, Utils} from "../nan.js";

export default class MapItem extends GameObject{
    bc = 50;
  constructor(name,transform, bc) {
    super(name,new Transform(transform.position, null, new Vector(Math.sqrt(bc*bc*3) * 2,bc*4)));
    this.bc = bc;
    this.collider = new Vector(this.bc*3,this.bc*3);
    this.phy = new Polygon(new Transform(this.transform.position, null, new Vector(this.bc*4, this.bc*4)), 6, "fill","green");
    this.phy.lineWidth = 5;
  }

  update() {
    super.update();
    this.phy.offsetX = Math.sqrt(this.bc*this.bc*3);
    this.phy.startAngles = Math.PI / 6;

    if (MapManager.instance.selected == this.name) {
      this.phy.lateUpdate = (obj)=>{
        // console.log(obj);
        obj.lineColor = "yellow";
        obj.color = "red";
      }
    }
    else {
      this.phy.lineColor = "black";
      this.phy.color = "green"
    }
    return [this.phy];
  }

  lateUpdate() {
    // this.showColliderLine();
    // this.showFrameLine();
  }
}