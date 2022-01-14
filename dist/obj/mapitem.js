import { GameObject, Polygon, Transform, Vector } from "../nan.js";

export default class MapItem extends GameObject{
  
  constructor(name,transfrom) {
    super(name,transfrom);
  }

  update = function update() {                  
    let phy = new Polygon(new Transform(this.transfrom.position, null, new Vector(200, 200)), 6, "fill","green");    
    
    phy.lineColor = "black";
    phy.lineWidth = 3;
    phy.startAngles = Math.PI / 6;
    return [phy];
  }
}