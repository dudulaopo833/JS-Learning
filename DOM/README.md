# DOM(文档对象模型 Document Object Model)
* DOM是针对HTML和XML文档的一个API

# 其他总结
* [DOM Attribute and Method](): 记录了DOM的一些基础常用属性和方法
* [DOM Object](https://github.com/dudulaopo833/JS-Projects/blob/master/DOM/DOMObject.md ): 记录了DOM各种类型对象的基础知识
* [DOM Event](): 说明了两种事件流，说明了 html event, dom0 event, dom2 event 和 IE event; 并且说明了怎么用能力检测来兼容浏览器事件处理

# Summary
### Related vedio: http://www.imooc.com/video/9491  
* DOM(Document Object Model): 首先浏览器会把html内容解析成文档对象模型，然后就可以用document.xxx, window.xxx 去操作DOM元素   
> DOM0 (就是DOM标准出来之前)     
> DOM1(DOM Core, DOM HTML)       
> DOM2(DOM Views, DOM Events, DOM style, DOM Traversal and Range)     
> DOM3(DOM load And Save, DOM Validation)      
* DOM 支持多种文档类型(html-<!doctype html>, xml-<?xml>)
* DOM 节点类型(nodeType)常用的有八种(element-1, attribute=2, text-3, comment-8, document-9, documentType-10, documentFragment-11)
![nodeType_image](https://github.com/dudulaopo833/JS-Projects/blob/master/DOM/DOM.nodeType.jpg)
![nodeName_and_nodeValue](https://github.com/dudulaopo833/JS-Projects/blob/master/DOM/DOM.nodeName.jpg)

### 低版本IE不支持DOM2，所以有以下差异
* DOM: 有 event, document 对象; event对象有type, target, clientX(相对于文档), clientY, offsetX(相对于容器), offsetY, keyCode属性; event对象有 stopPropagation(), preventDefault()方法 
* IE: 有 window.event, window.document 对象; event对象有type, srcElement, clientX, clientY 属性; event对象有 cancelBubble, returnValue 属性来实现dom对应的取消冒泡和阻止默认事件的方法

### 关于domReady浏览器渲染的过程
> 1. 浏览器渲染引擎的渲染过陈: 解析html构建dom树(构建dom节点) -> 构建渲染树(解析样式信息) -> 布局渲染树(布局dom节点)-> 绘制渲染树(绘制dom节点)  
> 2. 简单来说就是：dom tree -> render tree -> layout render tree -> paint render tree   
> 3. 具体渲染过程可以参考[这里](http://kb.cnblogs.com/page/129756/)

### DOMReady实现策略：
> 0. window.onload 这个事件是等 dom树构建好，所有外部资源(图片/请求)完成之后才触发；如果外部资源很多，那么就很慢！
> 0. document.onreadystatechange 这个事件和window.onload 相当，也要等所有资源加载好了才处理, 这个主要针对iframe!
> 1. 对于支持DOMContentLoaded事件的现代浏览器，就使用DOMContentLoaded事件
> 2. 对于不支持DOMContentLoaded事件的低版本IE浏览器，就是用document.documentElement.doSroll('left')来判断DOM树是否创建完毕! 
> 3. 各大前段框架的DOMReady实现可以参考[这里](http://www.cnblogs.com/JulyZhang/archive/2011/02/12/1952484.html)

