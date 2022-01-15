import { GameObject, Polygon, Transform, Vector, Utils} from "../nan.js";

export default class MapItem extends GameObject{
  test = "black";
  constructor(name,transform) {
    super(name,new Transform(transform.position, null, new Vector(200,200)));
    this.test = Utils.getRandomColor();
  }

  update = function update() {                  
    let phy = new Polygon(new Transform(this.transform.position, null, new Vector(200, 200)), 6, "fill","green");    
    
    phy.lineColor = "black";
    phy.lineWidth = 1;
    phy.startAngles = Math.PI / 6;      
    this.showColliderLine(this.test);
    return [phy];
  }
}