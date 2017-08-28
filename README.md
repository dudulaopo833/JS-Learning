# Content
* [DOM](): 记录了DOM的一些基础知识
* [DOM Event](): 说明了两种事件流，说明了 html event, dom0 event, dom2 event 和 IE event; 并且说明了怎么用能力检测来兼容浏览器事件处理   
* [DOM Event - Mouse Event - QQ drag](): 用拖拽QQ面板的小例子来演示了Mouse Event; 涉及到了DOM元素属性clientWidth,scrollWidth,offsetWidth,offsetLeft,className,innerHTML等;  以及DOM事件对象属性clientX, clientY,offsetX,target,type等
* [DOM Event - Mouse Event - SlidingDoor](): js实现移动门的效果
* [DOM_domReady](): 自己实现了domReady的功能，并且和window.onload 对象，也给了各大前端框架的domReady的实现

# Summary
在前端世界， 有很多对象，具体看下图
## Broswer Object（都是全局对象）
> 1. [Window Object](https://github.com/dudulaopo833/JS-Projects/blob/master/BroswerObject_WindowObject.md) Window对象表示浏览器中打开的窗口，包含对浏览器或者iframe操作的一系列属性和方法    
> 2. [Location Object](https://github.com/dudulaopo833/JS-Projects/blob/master/BroswerObject_WindowObject_LocationObject.md): 表示窗口中当前显示的文档的 Web 地址(url)的相关信息
> 3. History Object: History对象设计来表示窗口的浏览历史.
```
只有history.length一个属性，表示当前浏览器历史列表中的url数量
有back(), forward(), go(number|url) 三个方法
很多框架都会基于这个history对象去封装router；也有很多框架是基于location.hash去实现单页应用(不重新加载文档)
```
> 4. Navigator Object: Navigator对象包含有关浏览器的信息.它的属性描述了正在使用的浏览器，可以用这些属性进行平台专用的配置
```
navigator.plugins: 列举了浏览器已经安装的插件
navigator的有这些常用的属性： userAgent, cookieEnabled, language, appName, appVersion, appCodeName.
```
> 5. Screen Object：Screen对象存放着有关浏览器显示屏幕的信息.
```
常用属性： 
width, height, availWidth, availHeight(除了任务栏之后的高度)
colorDepth, fontSmoothingEnabled(启用字体平滑), orientation(横竖屏), updateInterval
```
## HTML DOM Object
refer to [DOM Object](https://github.com/dudulaopo833/JS-Projects/blob/master/DOMObject.md)  
> document object  
> elment object  
> attribute object  
> event object   
## JS Object
> Array, String, Boolen, Number   
> Functions, Events, RegExp  
> Data, Math   

