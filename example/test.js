/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import {
  Nan, Transform, Vector, GameObject, NLine,
} from '../dist/nan.js';

import MapManager from './manager/mapmanager.js';

const nan = new Nan(document.getElementById('canvas'), 30);
nan.canvasDraggable = true;
const mapManager = new MapManager(2, 2, new Vector(5, 5));
mapManager.init();

const applyButton = document.getElementById('apply');
applyButton.addEventListener('click', MapManager.changeMapItem);

class TestObject extends GameObject {
  update() {
    super.update();
    const obj = new NLine(new Transform(), new Vector(new Vector(0, 0), new Vector(100, 100)));
    obj.width = 0.5;
    return [obj];
  }
}

const obbbbb = new TestObject('BBBB');
nan.add(obbbbb);
Nan.render();
