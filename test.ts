import { Nan } from "./nan";
import { NanObject } from "./object/nanobject";
import { Sprite } from "./object/sprite";
import { Transform } from "./utils/transform";
import { Vector2 } from "./utils/vector";

const canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let nan:Nan = new Nan(canvas);
let sprite:Sprite = new Sprite("Hello",new Transform(new Vector2(0,0),new Vector2(0,0)));

nan.addObject(sprite);