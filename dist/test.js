import { Nan } from "./nan";
import { Sprite } from "./object/sprite";
import { Transform } from "./utils/transform";
import { Vector2 } from "./utils/vector";
var canvas = document.getElementById('canvas');
var nan = new Nan(canvas);
var sprite = new Sprite("Hello", new Transform(new Vector2(0, 0), new Vector2(0, 0)));
nan.addObject(sprite);
