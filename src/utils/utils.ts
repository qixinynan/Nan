export default class Utils {
  static getRandomColor(): string {
    let colorStr = '#';
    const randomArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 6; i += 1) {
      colorStr += randomArr[Math.ceil(Math.random() * (15 - 0) + 0)];
    }
    return colorStr;
  }
}
