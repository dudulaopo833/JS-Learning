# JS 总结
* CSS ---style---> HTML <---DOM-BOM-ESCAMScript--- JS 
* JS共包含三部分: ECMAScript(一个标准), DOM(Document Object Model), BOM(Broswer Object Model)
* 每个部分都有一些规范, 比如ECMAScript, DOM - W3C Standard, BOM - HTML5 standard

### ESCAMScript(JS standard): JS标准  
> Array, String, Boolen, Number   
> Functions, Events, RegExp  
> Data, Math 

### BOM(Broswer Object Model): 处理浏览器导航, 窗口, 分辨率, history, cookie等操作 
> 有 Window, Location, History, Navigator, Screen 等对象

###  DOM(Document Object Model): 首先浏览器会把html内容解析成文档对象模型，然后就可以用docment.xxx, window.xxx 去操作DOM元素
> 有 document, elment, attribute, event 对象    
> DOM0 (就是DOM标准出来之前)     
> DOM1(DOM Core, DOM HTML)       
> DOM2(DOM Views, DOM Events, DOM style, DOM Traversal and Range)     
> DOM3(DOM load And Save, DOM Validation) 

### 详细知识
关于DOM参考[这个总结]()
关于BOM参考[这个总结]()

### 例子 
* [DOM Event - Mouse Event - QQ drag](): 用拖拽QQ面板的小例子来演示了Mouse Event; 涉及到了DOM元素属性clientWidth,scrollWidth,offsetWidth,offsetLeft,className,innerHTML等;  以及DOM事件对象属性clientX, clientY,offsetX,target,type等
* [DOM Event - Mouse Event - SlidingDoor](): js实现移动门的效果
* [DOM_domReady](): 自己实现了domReady的功能，并且和window.onload 对象，也给了各大前端框架的domReady的实现


