import {Nan,NText,Transform,Vector,GameObject,NLine, Polygon, Sprite} from './nan.js';
import MapItem from './obj/mapitem.js'
import MapManager from './manager/mapmanager.js'

let nan = new Nan(document.getElementById('canvas'),30);
nan.canvasDraggable = true;
nan.extraCleanRect = new Vector(600,600);
let mapManager = new MapManager(99,99,new Vector(5,5));
mapManager.init();




