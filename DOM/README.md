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
document.body.clientWidth(body) || document.documentElement.clientWidth(maybe body+margin+border), document.doctype.nodeName
DOM.innerHTML, DOM.offsetWidth, DOM.clientWidth, DOM.scrollWidth
方法：
document.createDocumentFragment(), document.getElementById('id'), document.getElementsByTagName('elementTag'), document.createElement('elmentTag'), DOM.appendChild(DOM)
```
* 低版本IE不支持DOM2，所以有以下差异
> DOM: 有 event, document 对象; event对象有type, target, clientX(相对于文档), clientY, offsetX(相对于容器), offsetY 属性; event对象有 stopPropagation(), preventDefault()方法 

> IE: 有 window.event, window.document 对象; event对象有type, srcElement, clientX, clientY 属性; event对象有 cancelBubble, returnValue 属性来实现dom对应的取消冒泡和阻止默认事件的方法   
* 关于domReady浏览器渲染的过程
> 1. 浏览器渲染引擎的渲染过陈: 解析html构建dom树(构建dom节点) -> 构建渲染树(解析样式信息) -> 布局渲染树(布局dom节点)-> 绘制渲染树(绘制dom节点)  
> 2. 简单来说就是：dom tree -> render tree -> layout render tree -> paint render tree   
> 3. 具体渲染过程可以参考[这里](http://kb.cnblogs.com/page/129756/)
* DOMReday实现策略：
> 1. 对于支持DOMContentLoaded事件的现代浏览器，就使用DOMContentLoaded事件
> 2. 对于不支持DOMContentLoaded事件的低版本IE浏览器，就是用document.documentElement.doSroll('left')来判断DOM树是否创建完毕! 

