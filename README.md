# Nan Graphic Frame - 南渲染框架

“南”是一款轻量级的网页Canvas渲染框架。主要设计灵感来自于Unity。该框架正在开发中，可能不完善，欢迎加入。

## 如何使用

南非常容易使用，首先你需要克隆南的源码 （由于南仍处于开发中，所以并未发布NPM包）

```bash
git clone https://github.com/Qixinies/Nan.git //克隆
cd Nan //进入目录
npm install //安装所需依赖
```

你可以通过 ``npm run dev`` 来启动调试服务器。在浏览器中打开控制台中输出的网址 （一般来说是 http://localhost:8080/ ） 

或者通过 ``npm run build`` 进行打包后手动部署到你的Web服务器,一般会打包到/dist文件夹下。无论你选择的是调试服务器还是打包，index.html都在/dist目录下。

南默认提供了一个丑陋的案例，你可以在 ``/src/test.js`` 查看其源码或进行修改。


```javascript
import { NanObject } from "object/nanobject";
import { Nan } from "./nan";
import { Sprite } from "./object/sprite";
import { Transform } from "./utils/transform";
import { Vector2 } from "./utils/vector";

//获取Canvas
const canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

//实例化Nan 
let nan:Nan = new Nan(canvas,60); //设置每秒60帧
//创建与读取图片
let img:CanvasImageSource = new Image();
img.src = 'a.png';
img.onload = ()=>{
  let sprite:Sprite = new Sprite("Hello123",new Transform(new Vector2(0,0),new Vector2(0,0)),img);
  sprite.update = (obj:NanObject)=>{ //update会在每一帧执行一次
    console.log("I'm being rendered!!!",obj);        
    obj.transform.position.x += 1;  //移动物体位置     
  }

  //你完全可以将这里的Nan.getInstance()替换为上面所实例化的nan。这里只是为展示Nan是单例的
  Nan.getInstance().addObject(sprite);  //将创建的对象移交给Nan渲染
} 

//绑定按钮事件
const btn:HTMLButtonElement = document.getElementById("btn") as HTMLButtonElement;
btn.onclick = ()=>{
  //查询对象
  let obj:NanObject = Nan.getInstance().findObject("Hello123") as NanObject;
  obj.transform.position.x = 0; //移动物体位置 
}
```

## 对项目进行贡献
非常非常欢迎你可以对项目进行任何细微的贡献。由于目前项目太小所以还没有开发者指南。目前代码量很小，应该很容读懂。代码也有全中文的注释。如果你有不懂的可以通过下文提到的联系方式联系我。

## 联系我
如果你遇到什么问题或者对项目有什么不满意，亦或者想要对项目进行贡献或了解些什么。你可以选择联系我。

以下为我的联系方式:

Email: 3185835784@qq.com

QQ: 3185835784

微信号： codesx

## 开源许可
该项目基于MIT开源协议开源。但保留更改或撤销协议的权利


