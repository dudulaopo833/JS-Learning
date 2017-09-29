# HTML DOM Object
### html文档经过浏览器解析渲染之后就形成了DOM Object！
> 有 document, elment, attribute, event 对象  

#  document对象
### document对象集合
> all[], forms[], images[], links[]

### document对象属性
> body, title, cookie(navigator.cookieEnabled), domain(location.host), reffer/URL(location.href), lastModified, document.baseURI

### document对象方法
> 常用的： 
```js
a. document.getElementById(), document.getElementsByTagName(), document.getElementsByName()--> 标签中要有name属性     
b. document.getElementsByClassName(IE9+), document.querySelector()(IE8+), document.querySelectorAll()(IE8+) 
c. document.createElement(), document.createTextNode(), document.createAttribute(), document.createDocumentFragment()
```
> 不常用的： document.open(mimeType, replace) -> document.write()/document.writeIn() -> document.close();

# element对象
* HTML DOM中有文档节点，元素节点，属性节点，文本节点，注释节点；而元素节点又可以有元素节点，文本节点，注释节点做为子节点，也可以有属性！

### 常用的element对象属性：
> 0. element.dataset
> 1. element.firstChild, element.lastChild, element.nextSibling, element.previousSibling, element.parentNode, element.ownDocument, 
> 2. element.className, element.style, element.attributes[], element.childNodes[]     
> 3. element.nodeName, element.nodeType, element.nodeValue, element.tagName, element.title, element.tabIndex
> 4. element.innerHTML, element.innerText(不包含隐藏文本), element.textContent(包含隐藏文本), 
> 5. element.offsetHeight, element.offsetWidth, element.clientWidth, element.clientHeight, element.scrollWidth, element.scrollHeight
> 6. element.offsetLeft, element.offsetTop, element.offsetParent, element.scrollleft, element.scrollTop
> 7. 不常用的element.isContentEditable, element.contentEditable

### 常用的element对象方法： 
> 1. element.getElementsByTagName(), element.cloneNode()
> 2. element.appendChild(), element.insertBefore()
> 3. element.removeChild(), element.replaceChild()
> 4. element.getAttribute()/element.getAttributeNode(), element.setAttribut()/element.setAttributeNode(), element.removeAttribute()/element.removeAttributeNode()
> 5. element.hasAttribute(), element.hasChildNodes(), 
> 6. element.isEqualNode(), element.isSameNode()
> 7. 不常用的element.normalize(), element.toString()

# attribute对象
* 常用属性： attr.isId, attr.name, attr.value, 

# event对象
### 常用事件类型属性：
> onclick/ondbclick, onchange,    
> onkeydown/up, onkeypress, onmousedown/up,    
> onmouseover, onmousemove, onmouseout,    
> onblur, onfocus, onselect, onsubmit,    
> onload(和window.onload不一样), onunload,   
### 常用方法: 
> DOM : preventDefault(), stopPropagation()   
> IE: returnValue, cacelBubble属性
### 常用属性： 
> DOM: target, type, keyCode, clientX, clientY, screenX, screenY   
> IE: srcElement, type, keyCode, offsetX, offsetY   


