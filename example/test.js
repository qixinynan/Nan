import { Nan, NText, Transform, Vector, GameObject, NLine, Polygon, Sprite } from '../dist/nan.js';
import MapItem from './obj/mapitem.js'
import MapManager from './manager/mapmanager.js'

let nan = new Nan(document.getElementById('canvas'), 30);
nan.canvasDraggable = true;
let mapManager = new MapManager(2, 2, new Vector(5, 5));
mapManager.init();

let applyButton = document.getElementById("apply");
applyButton.addEventListener('click', mapManager.changeMapItem)

class TestObject extends GameObject {
  update = () => {
    const obj = new NLine(new Transform(), new Vector(new Vector(0 ,0), new Vector(100, 100)))
    obj.width = 0.5;
    return [obj];
  }
}

// const obbbbb = new TestObject('BBBB');
// nan.add(obbbbb);
// Nan.render().then(() => console.log("then"));
Nan.render();


