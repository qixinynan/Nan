import { Nan, NText, Transform, Vector, GameObject, NLine, Polygon, Sprite } from '../dist/nan.js';
import MapItem from './obj/mapitem.js'
import MapManager from './manager/mapmanager.js'

let nan = new Nan(document.getElementById('canvas'), 30);
nan.canvasDraggable = true;
let mapManager = new MapManager(30, 30, new Vector(5, 5));
mapManager.init();

let applyButton = document.getElementById("apply");
applyButton.addEventListener('click', mapManager.changeMapItem)




