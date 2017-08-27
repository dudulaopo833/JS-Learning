# HTML DOM Object
### html文档经过浏览器解析渲染之后就形成了DOM Object！
# DOM document对象
# document对象集合
> all[], forms[], images[], links[]
### document对象属性
> body, title, cookie(navigator.cookieEnabled), domain(location.host), reffer/URL(location.href), lastModified
### document对象方法
> 常用的： document.getElementById(), document.getElementsByTagName(), document.getElementsByName()--> 标签中要有name属性   
> 不常用的： document.open(mimeType, replace) -> document.write()/document.writeIn() -> document.close();

# DOM Element对象
* HTML DOM中有文档节点，元素节点，属性节点，文本节点，注释节点；而元素节点又可以有元素节点，文本节点，注释节点做为子节点，也可以有属性！
* 常用的element对象属性：
> 1. element.firstChild, element.lastChild, element.nextSibling, element.previousSibling, element.parentNode, element.ownDocument, 
> 2. element.className, element.style, element.attributes[], element.childNodes[]     
> 3. element.nodeName, element.nodeType, element.nodeValue, element.innerHTML, element.tagName, element.textContent, element.title, element.tabIndex
> 4. element.offsetHeight, element.offsetWidth, element.clientWidth, element.clientHeight, element.scrollWidth, element.scrollHeight
> 5. element.offsetLeft, element.offsetTop, element.offsetParent, element.scrollleft, element.scrollTop
> 6. 不常用的element.isContentEditable, element.contentEditable
* 常用的element对象方法： 
> 1. element.getElementsByTagName(), element.cloneNode()
> 2. element.appendChild(), element.insertBefore()
> 3. element.removeChild(), element.replaceChild()
> 4. element.getAttribute()/element.getAttributeNode(), element.setAttribut()/element.setAttributeNode(), element.removeAttribute()/element.removeAttributeNode()
> 5. element.hasAttribute(), element.hasChildNodes(), 
> 6. element.isEqualNode(), element.isSameNode()
> 7. 不常用的element.normalize(), element.toString()


