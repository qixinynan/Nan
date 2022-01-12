import {NanObject} from 'object/nanobject'
import {Sprite} from 'object/sprite'

export class Nan {
  private canvas:HTMLCanvasElement;
  private ctx:CanvasRenderingContext2D;
  private objList:Array<NanObject> = [];

  constructor(canvas:HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  addObject(obj:NanObject) {   
    console.log("Add " + obj.name); 
    this.objList.push(obj);
  }

}