import {Nan,NText,Transform,Vector,GameObject,NLine, Polygon} from './nan.js';  
class MyObject extends GameObject {
  init() {
    this.transfrom = new Transform(new Vector(10,10),new Vector(0,0),new Vector(1,1));    
  }

  update = function update() {       
    let ntext = new NText(this.transfrom, "Hello World","green");
    let nline = new NLine(this.transfrom, new Vector(new Vector(0,0),new Vector(100,100)),"black");    
    let phy = new Polygon(new Transform(new Vector(100,100)), 6, 100,"fill","red");
    phy.lineColor = "black";
    phy.lineWidth = 2;
    ntext.update = (obj)=>{   
      obj.text = "现在时间: " + Date.now().toString();
    }
    return [ntext, nline, phy];
  }
}

let nan = new Nan(document.getElementById('canvas'));    
nan.add(new MyObject("Name"));
console.log(nan.objList);

