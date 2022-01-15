export default class Utils {
   static getRandomColor(): string {
    var colorStr="#";
    var randomArr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    for(var i=0;i<6;i++){          
      colorStr+=randomArr[Math.ceil(Math.random()*(15-0)+0)];  
    }
    return colorStr;
   }
}