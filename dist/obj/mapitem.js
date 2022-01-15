import { GameObject, Polygon, Transform, Vector } from "../nan.js";

export default class MapItem extends GameObject{
  radius = 100;

  constructor(name,transfrom) {
    super(name,transfrom);
  }

  update = function update() {                  
    let phy = new Polygon(this.transfrom, 6, this.radius,"fill","green");    
    
    phy.lineColor = "black";
    phy.lineWidth = 3;
    phy.startAngles = Math.PI / 6;
    return [phy];
  }
}