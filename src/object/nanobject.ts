import { Transform } from "utils/transform";
export class NanObject {
  name:String;
  transform:Transform;
  constructor (name:String,transform:Transform) {
      this.name = name;
      this.transform = transform;
  }
}