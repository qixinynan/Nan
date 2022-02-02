/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-cycle
import MapManager from '../manager/mapmanager.js';
import {
  GameObject, Polygon, Transform, Vector,
} from '../../dist/nan.js';

export default class MapItem extends GameObject {
  bc = 50;

  height = 0;

  constructor(name, transform, bc) {
    super(
      name,
      new Transform(transform.position, null, new Vector(Math.sqrt(bc * bc * 3) * 2, bc * 4)),
    );
    this.bc = bc;
    this.collider = new Vector(this.bc * 3, this.bc * 3);
    this.phy = new Polygon(new Transform(this.transform.position, null, new Vector(this.bc * 4, this.bc * 4)), 6, 'fill', 'green');
    this.phy.lineColor = 'red';
    this.phy.lineWidth = 5;
  }

  update = () => {
    this.phy.offsetX = Math.sqrt(this.bc * this.bc * 3);
    this.phy.startAngles = Math.PI / 6;

    if (MapManager.instance.selected === this.name) {
      this.phy.updated = () => {
        // console.log("I'M IN LATEUPDATE");
        this.phy.lineColor = 'yellow';
        this.phy.update();
      };
    } else {
      this.phy.lineWidth = 2;
      this.setHeightColor();
      this.phy.updated = () => undefined;
    }
    return [this.phy];
  };

  setHeightColor() {
    this.phy.lineColor = 'red';
    this.phy.color = this.getColorByHeight();
  }

  getColorByHeight() {
    const { maxHeight } = MapManager.instance;
    const a = 255;
    const b = 255 - this.height / (maxHeight * 136);
    const c = 255 - this.height / (maxHeight * 255);
    const color = `rgb(${a},${b},${c})`;
    return color;
  }
}
