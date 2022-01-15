import {Nan,NText,Transform,Vector,GameObject,NLine, Polygon, Sprite} from './nan.js';  
import MapItem from './obj/mapitem.js'
import MapManager from './manager/mapmanager.js'

let nan = new Nan(document.getElementById('canvas'),60);    
nan.canvasDraggable = true;
nan.extraCleanRect = new Vector(400,400);
let mapManager = new MapManager(10,10,new Vector(-150,-150));
mapManager.init();




