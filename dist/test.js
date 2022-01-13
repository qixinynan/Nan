import {Nan,NText,Transform,Vector,GameObject} from './nan.js';  
class MyObject extends GameObject {
  init() {
    this.transfrom = new Transform(new Vector(10,10),new Vector(0,0),new Vector(1,1));    
  }

  update = function update() {       
    let ntext = new NText(this.transfrom,"Hello World");  
    ntext.update = (obj)=>{   
      obj.text = "现在时间: " + Date.now().toString();   
    } 
    return [ntext];              
  }
}

let nan = new Nan(document.getElementById('canvas'));    
nan.add(new MyObject("Name"));
console.log(nan.objList);

