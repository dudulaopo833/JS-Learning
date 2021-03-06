# JS 总结
* CSS ---(style)---> HTML <---(DOM-BOM-ESCAMScript)--- JS 
* JS共包含三部分: ECMAScript(一个标准), DOM(Document Object Model), BOM(Broswer Object Model)
* 每个部分都有一些规范, 比如ECMAScript, DOM - W3C Standard, BOM - HTML5 standard

### JS文件在浏览器加载
* 服务器传送JS文件是用MIME type为application/x-javascript
* 浏览器加载(解析)JS文件是一个接一个, 按先后顺序来的
* <script>标签有async, defer, src, type等属性

### ESCAMScript(JS standard): JS标准  
> Array, String, Boolen, Number   
> Functions, Events, RegExp  
> Data, Math 

### BOM(Broswer Object Model): 处理浏览器导航, 窗口, 分辨率, history, cookie等操作 
> 有 Window, Location, History, Navigator, Screen 等对象

###  DOM(Document Object Model): 首先浏览器会把html内容解析成文档对象模型，然后就可以用document.xxx, window.xxx 去操作DOM元素
* DOM是针对HTML和XML文档的一个API
> 有 document, elment, attribute, event 对象    
> DOM0 (就是DOM标准出来之前)     
> DOM1(DOM Core, DOM HTML)       
> DOM2(DOM Views, DOM Events, DOM style, DOM Traversal and Range)     
> DOM3(DOM load And Save, DOM Validation) 

### 详细知识
> 1. 关于DOM参考[这个总结](https://github.com/dudulaopo833/JS-Projects/tree/master/DOM)
> 2. 关于BOM参考[这个总结](https://github.com/dudulaopo833/JS-Projects/tree/master/BOM)

### 例子 
* [DOM Event - Mouse Event - QQ drag](https://github.com/dudulaopo833/JS-Projects/tree/master/DOMEvent_MouseEvent_QQ_Drag): 用拖拽QQ面板的小例子来演示了Mouse Event; 涉及到了DOM元素属性clientWidth,scrollWidth,offsetWidth,offsetLeft,className,innerHTML等;  以及DOM事件对象属性clientX, clientY,offsetX,target,type等
* [DOM Event - Mouse Event - SlidingDoor](https://github.com/dudulaopo833/JS-Projects/tree/master/DOMEvent_MouseEvent_SlidingDoor): js实现移动门的效果
* [DOM_domReady](https://github.com/dudulaopo833/JS-Projects/tree/master/DOMReady_Simulate): 自己实现了domReady的功能，并且和window.onload 对象，也给了各大前端框架的domReady的实现
* [DOM Event - Key Event - Lottery](https://github.com/dudulaopo833/JS-Projects/tree/master/DOMEvent_KeyboardEvent_Lottery): 用键盘事件来模拟了一个抽奖程序
* [hash - Single Page App](https://github.com/dudulaopo833/JS-Projects/tree/master/Route_Hash): 用html5的hashchange事件来实现单页应用; 改变锚点hash不会触发浏览器的onload事件, 仅仅改变地址栏的hash; hash仅仅是客户端的一个状态，也就是说，当向服务器发请求的时候，**hash部分并不会发过去**
* [history - Single Page App](): 用html5的history增强事件pushState()/replaceState来触发window的popstate事件来实现单页应用; 原因是pushState()/replaceState()方法不会真的向服务器发送请求


