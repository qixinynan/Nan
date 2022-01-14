import {Nan,NText,Transform,Vector,GameObject,NLine, Polygon, Sprite} from './nan.js';  
class MyObject extends GameObject {
  init() {
    this.transfrom = new Transform(new Vector(10,10),new Vector(0,0),new Vector(1,1));    
  }

  update = function update() {        
    /**TODO 测试颜色问题
     * TODO 全部size化     
     **/
    let ntext = new NText(new Transform(this.transfrom.position,null,new Vector(50,20)), "Hello World");  
    ntext.update = (obj)=>{   
      obj.text = "现在时间: " + Date.now().toString();      
    }    
    ntext.lateUpdate = ()=> {      
    }

    let nline = new NLine(this.transfrom, new Vector(new Vector(0,0),new Vector(100,100)));
    nline.update = ()=>{      
    }

    let phy = new Polygon(new Transform(new Vector(110,10), null, new Vector(300,300)), 6,"fill","green");
    phy.lineColor = "black";
    phy.lineWidth = 1;
    phy.update = ()=>{      
    }    

    var image = new Image();
    image.src = "./a.jpg";    
    let sprite = new Sprite(new Transform(this.transfrom.position), image, true)    
    
    return [ntext, nline, phy, sprite];
  }
}

let nan = new Nan(document.getElementById('canvas'));    
nan.add(new MyObject("Name"));
console.log(nan.objList);

