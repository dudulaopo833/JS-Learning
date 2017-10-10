
## Navigator的属性描述了正在使用的浏览器，可以用这些属性进行平台专用的配置
> 1. navigator的有这些常用的属性： userAgent, plugins, platform, userLanguage, userProfile, cookieEnabled, language, appName, appVersion, appCodeName, mimeTypes, onLine
> 2. 有些插件或者说框架会去extend这个navigator对象, 比如**cordova**

## 检测插件
* navigator.plugins: 列举了浏览器已经安装的插件, plugins是一堆的plugin的对象数组, 每个对象都有name, description, filename, length. 我们可以用name来检测插件; 但是IE不是检测name, 而是用ActiveXObject来检测COM标识符
```js
// 非IE
function hasPlugin(name) {
  name = name.toLowerCase();
  for (var i = 0 ; i < navigator.plugins.length; i ++){
    if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
      return true;
    }
  }
  return false;
}
alert(hasPlugin('Flash'));
// IE
function hasIEPlugin(COMID){
  try {
    new ActiveXObject(COMID);
  } catch(ex) {
    return false;
  }
}
alert(hasIEPlugin('ShockwaveFlash.ShockwaveFlash'));
// 兼容浏览器的方式
function hasFlashPlugin(){
  var result = hasPlugin('Flash');
  if (!result){
    result = hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
  }
}
```

## 检测客户端
客户端检测有三种方式, 按照推荐使用顺序如下：
* 1. 能力检测(**最常用的检测方式**): 能力检测不检测浏览器和版本, 只检测能力. 一般先检测达成目的最常用的特性, 并且必须检测实际用到的能力. 可以参考这个[例子](https://github.com/dudulaopo833/JS-Projects/blob/master/DOM/DOMEvent/util.js)

* 2. 怪癖检测：识别浏览器的呈现引擎特殊行为, 怪癖检测也不能精确检测浏览器和版本

* 3. 用户代理检测(客户端不建议用, 服务器端用得多): 依赖用户代理字符串(客户端判断navigator.usrAgent, 服务器端判断HTTP请求的相应首部), 但是这个避免不了电子欺骗(修改请求用户代理字符串, 错误或者误导信息, 来欺骗服务器). 但是这个用户代理检测能检测出浏览器和版本, 甚至移动设备都可以检测

### 用户代理检测详解

* 浏览器发展历史中, 因为生存, 就有IE, Safari, Konqueror等沿用Netscape的用户代理字符串(自带自己的私货)

> 1. Mosaic: Mosaic/版本号 ---> Mosaic/0.9
> 2. Netscape(Masaic Killer简写 -> Mozilla): Mozilla/版本号 (平台; 加密类型) ---> Mozilla/2.02 (WinNT; I)
> 3. IE 3: Mozilla/2.0 (compatible; **MSIE** 版本号; 操作系统) ---> Mozilla/2.0 (compatible; MSIE 3.02; Windows 95)
> 4. IE 8: Mozilla/4.0 (compatible; MSIE 版本号; 操作系统; **Trident/版本号**)
> 5. Gecko 呈现引擎(从Netscape 6中开始, 有firefox, SeeMonkey, Camino): Mozilla/5.0 (操作系统; 预先发行版本) **Gecko/版本号** 产品名称 ---> Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox 4.0.1
> 6. KHTML 呈现引擎 (Konqueror Linux浏览器): Mozilla/5.0 (compatible; **Konqueror/版本号**; 操作系统) **KHTML/版本号 (like Gecoko)** ---> Mozilla/5.0 (compatible; Konqueror/3.5; SunOS) KHTML/3.5.0 (like Gecko)
> 7. WebKit 呈现引擎(Safari): Mozilla/5.0 (平台; 加密类型; 操作系统; 语言) **AppleWebkit/版本号** (KHTML, like Gecko) **Safari/版本号** ---> Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebkit/124 (KHTML, like Gecko) Safari/125.1
> 8. WebKit 呈现引擎(Chrome, 用了不同JS引擎): Mozilla/5.0 (平台; 加密类型; 操作系统; 语言) AppleWebkit/版本号 (KHTML, like Gecko) **Chrome/版本号** Safari/版本号
> 9. 异类Opera: 在Opera10之前修改自己的用户代理字符串为Firefox或者IE, Opera10固定为 Opera/9.80 (操作系统; 加密类型; 语言) Presto/版本号 Version/版本号 ---> Opera/9.80 (Windows NT 6.1; U; en) Presto/2.6.30 Version/10.63
> 10. IOS移动设备(基于Webkit呈现引擎): mozilla/5.0 (平台; 加密类型; 操作系统**like Mac OS X**; 语言) AppleWebKit/版本号 (KHTML, like Gecko) Version/版本号 **Mobile/版本号** Safari/版本号
> 11. Android移动设备(基于Webkit呈现引擎): Mozilla/5.0（Linux; U; **Android 2.2**; en-us; Nexus One Build/FRF91） AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 **Mobile** Safari/533.1

* 呈现引擎
> 1. Trident : IE
> 2. Gecko: Firefox, Netscape
> 3. WebKit: Safari, Chrome, IOS Mobile, Android Mobile
> 4. KTML: Konqueror(Linux platform)
> 5. Presto: Opera

* 检测用户代理, 检测呈现引擎和最低版本就可以了; 顺序是按照伪装程度从高到低; 先检测Opera, 再来是WebKit, 第三是KHTML, 第四是Gecko, 最后是IE
> 1. 识别opera, 必须检测window.opera对象， window.opera.version()返回opera浏览器版本
> 2. 识别WebKit, 可以检测用户代理字符串中的AppleWebKit这个独一无二的标志
> 3. 识别KHTML, 可以检测用户代理字符串中的KHTML或者早期的Konqueror标志
> 4. 识别Gecko，可以检测用户代理字符串中的 rv:xxx) Gecko/xxx标志
> 5. 识别IE, 可以检测用户代理字符串中的MSIE

* 检测浏览器, 主要是区分WebKit呈现引擎中是Chome还是Safari, 以及区分Gecko呈现引擎中是firefox
> 1. 识别chrome或者safari, 可以检测用户代理字符串有没有Chrome标志
> 2. 识别firefox, 可以检测用户代理字符串有没有Firefox标志

* 检测平台, 可以用navigator.platform 就足够了, 因为这个属性只会返回Win32, Win64, MacPPC, MacIntel, JX11, Linux i686; 但是如果要具体检测win中是哪种, 哪种移动设备, 哪种游戏系统, 都需要检测用户代理字符串

* 识别呈现引擎, 识别浏览器, 识别平台, 识别操作系统(包含识别移动设备和识别游戏系统)的util参考[这里](https://github.com/dudulaopo833/JS-Projects/blob/master/BOM/recognizeClientUtil.js)



