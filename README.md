# Summary
### CSS ---style---> HTML <---DOM-BOM-ESCAMScript--- JS   
* DOM(Document Object Model): 首先浏览器会把html内容解析成文档对象模型，然后就可以用docment.xxx, window.xxx 去操作DOM元素   
* BOM(Broswer Object Model): 处理浏览器导航, 窗口, 分辨率, history, cookie等操作   
* ESCAMScript(JS standard): JS标准     
> DOM1(DOM Core, DOM HTML)   
> DOM2(DOM Views, DOM Events, DOM style, DOM Traversal and Range)   
> DOM3(DOM load And Save, DOM Validation)    
* DOM 支持多种文档类型(html-<!doctype html>, xml-<?xml>)
* DOM 节点类型(nodeType)常用的有八种(element-1, attribute=2, text-3, comment-8, document-9, documentType-10, documentFragment-11)
```
属性： 
DOM.nodeType, DOM.nodeName, DOM.nodeValue, DOM.attributes, DOM.childNodes, 
document.body.childNodes, document.doctype.nodeName, 
DOM.innerHTML, DOM.offsetWidth, DOM.clientWidth, DOM.scrollWidth
方法：
document.createDocumentFragment(), document.getElementById('id'), document.getElementsByTagName('elementTag'), document.createElement('elmentTag'), 
DOM.appendChild(DOM)
```
* 低版本IE不支持DOM2，所以有以下差异
> DOM: 有 event, document 对象; event对象有type, target, clientX, clientY 属性; event对象有 stopPropagation(), preventDefault()方法      

> IE: 有 window.event, window.document 对象; event对象有type, srcElement, clientX, clientY 属性; event对象有 cancelBubble, returnValue 属性来实现dom对应的取消冒泡和阻止默认事件的方法   

# Content
* [DOM](): 记录了DOM的一些基础知识
* [DOM Event](): 说明了两种事件流，说明了 html event, dom0 event, dom2 event 和 IE event; 并且说明了怎么用能力检测来兼容浏览器事件处理   
* [DOM Event - Mouse Event - QQ drag](): 用拖拽QQ面板的小例子来演示了Mouse Event; 涉及到了DOM元素属性clientWidth,scrollWidth,offsetWidth,offsetLeft,className,innerHTML等;  以及DOM事件对象属性clientX, clientY,offsetX,target,type等
* [DOM Event - Mouse Event - SlidingDoor](): js实现移动门的效果
* [DOM_domReady](): 自己实现了domReady的功能，并且和window.onload 对象，也给了各大前端框架的domReady的实现

