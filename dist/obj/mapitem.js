import MapManager from "../manager/mapmanager.js";
import { GameObject, Polygon, Transform, Vector, Utils} from "../nan.js";

export default class MapItem extends GameObject{  
  phy = new Polygon(new Transform(this.transform.position, null, new Vector(200, 200)), 6, "fill","green");
  constructor(name,transform) {
    super(name,new Transform(transform.position, null, new Vector(Math.sqrt(7500) * 2,200)));    
    this.collider = new Vector(150,150);
    this.phy.lineWidth = 5;
  }

  update() {
    super.update();              
    this.phy.offsetX = Math.sqrt(7500);
    this.phy.startAngles = Math.PI / 6;

    if (MapManager.instance.selected == this.name) {        
      this.phy.lineColor = "yellow"
      this.phy.color = "red"
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