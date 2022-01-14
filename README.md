# Nan Graphic Frame - 南渲染框架

“南”是一款轻量级的网页Canvas渲染框架。主要设计灵感来自于Unity。该框架正在开发中，可能不完善，欢迎加入。

## 如何使用

南非常容易使用，首先你需要克隆南的源码 （由于南仍处于开发中，所以并未发布NPM包）

```bash
git clone https://github.com/Qixinies/Nan.git //克隆
cd Nan //进入目录
npm install //安装所需依赖
```

你可以通过 ``npm run dev`` 来启动调试模式。在你修改代码框架代码后，它会自动帮你编译到为/dist/nan.js文件。

或者通过 ``npm run build`` 进行打包后手动部署到你的Web服务器,一般会打包到/dist文件夹下。无论你选择的是调试服务器还是打包，index.html都在/dist目录下。

南默认提供了一个丑陋的案例，你可以在 ``/src/test.js`` 查看其源码或进行修改。想要运行南提供的案例，你可能需要一个Web服务器，南推荐你使用Visual Studio的Live Server插件。这可以快速的搭建简易的调试用Web服务器


```javascript
import {Nan,NText,Transform,Vector2,GameObject} from './nan.js';  
class MyObject extends GameObject {
  init() {
    this.transfrom = new Transform(new Vector2(10,10),new Vector2(0,0),new Vector2(1,1));    
  }

  update = function update() {       
    let ntext = new NText(this.transfrom,"Hello World");  
    ntext.update = (obj)=>{   
      obj.text = "现在时间: " + Date.now().toString();   
    } 
    return [ntext];              
  }
}

let nan = new Nan(document.getElementById('canvas'));    
nan.add(new MyObject("Name"));
console.log(nan.objList);
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


