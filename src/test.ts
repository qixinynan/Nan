import { Nan } from "./nan";
import { Sprite } from "./object/sprite";
import { Transform } from "./utils/transform";
import { Vector2 } from "./utils/vector";

const canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let nan:Nan = new Nan(canvas);
let sprite:Sprite = new Sprite("Hello123",new Transform(new Vector2(0,0),new Vector2(0,0)));
Nan.getInstance().addObject(sprite);