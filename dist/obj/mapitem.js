import { GameObject, Polygon, Transform, Vector, Utils} from "../nan.js";

export default class MapItem extends GameObject{  
  phy = new Polygon(new Transform(this.transform.position, null, new Vector(200, 200)), 6, "fill","green");
  constructor(name,transform) {
    super(name,new Transform(transform.position, null, new Vector(Math.sqrt(7500) * 2,200)));    
    this.collider = new Vector(120,120);    
  }

  update() {
    super.update();    
    this.phy.lineColor = "black";
    this.phy.offsetX = Math.sqrt(7500);    
    this.phy.startAngles = Math.PI / 6;     
    return [this.phy];
  }

  lateUpdate() {    
    this.showColliderLine();
    this.showFrameLine();
  }
}