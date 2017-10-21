# HTML DOM Object
----------------------------------------------------------------------------------------
### html文档经过浏览器解析渲染之后就形成了DOM Object！
* 1. Node类型 (以下所有节点类型都是**继承于这个Node类型**, 所以node类型的所有属性和方法, 其他节点类型都共享)

* 2. 节点类型(nodeType)常用的有八种(element-1, attribute=2, text-3, CDATASection-4, comment-8, document-9, documentType-10, documentFragment-11)
> 1. document类型(nodeType - 9)
> 2. elment类型 (nodeType - 1)
> 3. attribute类型 (nodeType - 2)
> 4. text类型(nodeType - 3)
> 5. comment类型(nodeType - 8)
> 6. CDATASection类型(nodeType - 4)
> 7. DocumentType类型(nodeType - 10)
> 8. documentFragment类型(nodeType - 11) 

### 节点层次
* 整个DOM文档的节点会有一些层次

# Node类型(所有节点共享这个类型的属性和方法)
----------------------------------------------------------------------------------------
> 1. 类型属性: nodeType, nodeName, nodeValue
> 2. 节点关系:
```js 
属性: childNodes, parentNode, previousSibling, nextSibling, firstChild, lastChild, ownerDocument
方法： hasChildNodes()
```
> 3. 操作节点：appendChild(), insertBefore(), replaceChild(), removeChild(), cloneNode(), normalize()

### 类型属性：
> 1. nodeType属性: 常用的有八种(element-1, attribute=2, text-3, CDATASection-4, comment-8, document-9, documentType-10, documentFragment-11)
> 2. nodeName和nodeValue属性： 
![nodeType_image](https://github.com/dudulaopo833/JS-Projects/blob/master/DOM/DOM.nodeType.jpg)
![nodeName_and_nodeValue](https://github.com/dudulaopo833/JS-Projects/blob/master/DOM/DOM.nodeName.jpg)

### 节点关系：
> 1. childNodes属性： 是一个NodeList对象, NodeList是一个类似数组的对象, 可以用方括号访问并且有length, 但是它不是Array实例
```js
var firstChild = someNode.childNodes[0]; // 方括号访问
var thirdChild = someNode.childNodes.item(2); // item()方法访问
var length = someNode.childNodes.length; // 访问长度
var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes, 0); // 显示调用来转换为Array数组，此方法用于非IE, 因为IE8之前NodeList都是实现为COM对象, 必须手动枚举

function convertToArray(nodes) {
    var array = null;
    try {
        array = Array.prototype.slice.call(nodes, 0); // 非IE浏览器
    } catch (ex) {
        array = new Array();
        for (var i = 0; len = nodes.length; i < len; i ++ ) {
            array.push(nodes[i]);
        }
    }

    return array;
}
```
> 2. parentNode, previousSibling, nextSibling属性：
> 3. firstChild, lastChild属性: 
```js
someNode.firstChild ==== someNode.childNodes[0];
someNode.lastChild === someNode.childNodes[someNode.childNodes.length - 1];
```
> 4. ownerDocument属性: 每个节点都有ownerDocument属性指向整个文档的文档节点document
> 5. hasChildNodes()方法: 用于判断有没有子节点, 比判断length直接

### 操作节点：
> 1. appendChild(): 用于向childNodes列表的末尾添加一个节点; 这个方法返回新增的节点
> 2. insertBefore(insetNode, beforeNode): 用于向childNodes列表的任何位置添加一个节点; 这个方法返回新增的节点
```js
var returnNode = someNode.insertBefore(newNode, null); // 添加到最后
alert(returnNode === someNode.lastChild); // true

returnNode = someNode.insertBefore(newNode, someNode.firstChild); // 添加在第一个列表
alert(returnNode === newNode); // true
```
> 3. replaceChild(insertNode, replaceNode): 用于替换childNodes列表任何节点; 替换出来的节点成为**文档孤点**
> 4. removeChild(removeNode): 用于移除childNodes列表任何节点; 返回被移除的节点, 这个节点成为**文档孤点**
> 5. cloneNode(true/false): true为深复制, 复制节点及节点的所有子节点树(包括节点的所有后代); 复制后的返回节点为**文档孤点**需要添加到文档中的某个位置; 还需要注意复制仅仅复制特性, **不会复制Javascript属性**(事件处理程序); 而IE中会复制事件处理程序, 建议复制之前移除事件处理程序
> 6. normolize(): 这个方法用于处理文本节点, 因为不同解析器或者DOM操作可能出现文本节点不包含文本, 接连出现两个文本节点

#  document类型对象
--------------------------------------------------------------------
### document节点是文档根节点, document对象是window对象的一个属性, 所以可以用作全局变量来用
> 1. nodeType 是9, 
> 2. nodeName是#document, 
> 3. nodeVaule是null, 
> 4. parentNode是null, 
> 5. ownerDocument是null, 
> 6. childNodes可能是最多一个documentType节点<!doctype html>, 最多一个Element节点<html>, 多个Comment节点, 多个ProcessingInstruction节点

### 属性
> 1. 一般属性： document.documentElement(<html>), document.body(<body>), document.title(<title>), document.doctype(<!doctype>)
> 2. 访问HTTP头部得属性: document.URL, document.domain, document.referrer, document.cookie, document.lastModified, document.baseURI
> 3. 集合属性: document.all, document.anchors(<a>), document.forms(<form>), document.images(<img>), document.links(<link>), document.applets(<applet>),
> 4. 检测功能属性: document.implementation属性, document.implementation.hasFeature(feature, featureVersion); 但这个不是很准确, 所以需要同时使用能力检测
> 5. 继承Node类型的属性: element.nodeName, element.nodeType, element.nodeValue, element.firstChild, element.lastChild, element.nextSibling, element.previousSibling, element.parentNode, element.ownDocument, element.childNodes[]  > element.nodeName, element.nodeType, element.nodeValue, element.firstChild, element.lastChild, element.nextSibling, element.previousSibling, element.parentNode, element.ownDocument, element.childNodes[]
> 6. HTML5扩展的属性: document.readyState(只有loading和complete两个值), document.compatMode(只有CSS1
Compat和BackCompat两个值)， document.head(<head>), document.charset， document.defaultCharset
> 7. **专有扩展**: document.documentMode, 要强制以某种模式渲染页面, 可以使用HTTP头部信息X-UA-Copatible来设置, 或者通过等价的<meta>标签来设置
```html
<meta http-equiv="X-UA-Compatible" content="IE=IEVersion"> <!-- IEVersion有Edge, EmulateIE9, EmulateIE8, EmulateIE7, 9, 8, 7, 5几种类型 -->
```

### 方法: 
* 查找节点方法
> 1. HTML和XML共有的方法： document.getElementById(), document.getElementsByTagName()
> 2. HTML自有方法： document.getElementsByName()标签要有name属性
Tip: document.getElementsByTagName()和document.getElementsByName()返回一个HTMLCollection的对象, 类似NodeList, 类似数组, 可以用length, 方括号, item(), namedItem()来读取
> 3. 扩展的CSS选择符API: document.querySelector(), document.querySelectorAll()
> 4. HTML5扩展的与类相关方法: document.getElementsByClassName(), 接收一个包含一个或多个**类名的字符串**(不是CSS选择符), 返回一个nodeList类数组对象

* 文档的写入操作方法
> document.open(mimeType, replace), document.write(), document.writeIn(), document.close();

* 创建各种节点的方法
> 1. document.createElement(), 
> 2. document.createTextNode(),
> 3. document.createAttribute(),
> 4. document.createDocumentFragment(),
> 5. document.createComment()

* 继承自Node类型的方法:
> appendChild(), insertBefore(), replaceChild(), removeChild(), cloneNode(), hasChildNodes(), normalize()

* **专有扩展**方法:
> 1. contains()：判断包含关系
> 2. compareDocumentPosition()： 判断两个节点的位置关系, 有1-无关, 2-居前, 4-居后, 8-包含, 16-被包含; 如果返回16效果就和contains一样


# element类型对象
------------------------------------------------------------------------
### HTML DOM中有文档节点，元素节点，属性节点，文本节点，注释节点；而元素节点又可以有元素节点，文本节点，注释节点做为子节点，也可以有属性！
> 1. nodeType 是1, 
> 2. nodeName是元素的标签名, 
> 3. nodeVaule是null, 
> 4. parentNode是Document或者Element, 
> 5. childNodes可能是多个Element节点, 多个Comment节点, 多个ProcessingInstruction节点，多个CDATASection节点或者EntityReference

### element对象属性：
* 继承自Node类型中的属性：
 > element.nodeName, element.nodeType, element.nodeValue, element.firstChild, element.lastChild, element.nextSibling, element.previousSibling, element.parentNode, element.ownDocument, element.childNodes[] 

* element类型的自有属性：
> 1. element.tagName(等于element.nodeName)
> 2. element.id, element.title, element.dir(ltr/rtl), element.className(与class对应), element.style, element.tabIndex
> 3. element.attributes: element类型是使用attributes属性的唯一一个DOM节点类型. elenent.attributes属性包含一个NamedNodeMap(类似NodeList). 有getNamedItem(name), removeNamedItem(name), setNamedItem(node), item(pos)方法

* DOM扩展的元素遍历属性：(不用担心空白文本节点的问题) 
> 1. childElementCount: 相当于childNodes.length
> 2. firstElementChild: 相当于parentElement.firstChild
> 3. lastElementChild: 相当于parentElement.lastChild
> 4. previousElementSibling: 相当于element.previousSibling
> 5. nextElementSibling: 相当于element.nextSibling

* HTML5扩展的属性
> 1. classList属性: 是一个DOIMTokenList的集合, 可以用以下方法来操控class属性, 而不用className属性来操控
```js
element.classList.add(value)
element.classList.contains(value)
element.classList.remove(value)
element.classList.toggle(value)
```
> 2. 焦点管理属性document.activeElement 和document.hasFocus()方法： 一般查询文档哪个元素获得焦点以及确定文档是否获得焦点, 是提高Web应用的无障碍性
> 3. 自定义属性: 以data-为前缀, 可以用element.dataset属性来访问自己定义的属性; element.dataset是一个键值对的DOMStringMap的实例
> 4. 插入标记: element.innerHTML, element.outerHTML包括自己); 有insetAdjacentHTML()方法

* **专有扩展**: 
> 1. element.children属性, 相当于childNodes属性, 为了处理文本节点中的空白符差异
> 2. 插入文本: element.innerText, element.textContent, element.outerText
```js
function getInnerText(element) {
    return (typeOf element.textContent == "string") ?
        element.textContent : element.innerText;
}
```
* DOM2属性
1. element.style: 如果是短划线的CSS属性名，则必须转换成驼峰大小写形式(比如backgroundImage); 特殊的有element.cssFloat, elment.className; element.style属性有下面的方法或者属性
```js
element.style.cssText;
element.style.getPropertyValue(propertyName);
element.style.item(index);
element.style.removeProperty(propertyName);
```
2. document.defaultView.getComputedStyle()得到计算之后的样式; IE中是element.currentSytle属性
3. 元素大小: 
> 1. 偏移量(element.offsetHeight, element.offsetWidth, element.offsetLeft, element.offsetTop, element.offsetParent) - 包含边框
> 2. 客户区大小(element.clientHeight, element.clientWidth) - 不包含边框
> 3. 滚动大小(element.scrollHeight, element.scrollWidth, element.scrollLeft, element.scrollTop)
> 4. element.getBoundingClientRect()返回一个矩形对象, 包含left, top, right, bottom, 给出了元素在页面中相对于视口的位置

### element对象方法： 
* 继承自Node类型的方法： 
> appendChild(), insertBefore(), replaceChild(), removeChild(), cloneNode(), hasChildNodes(), normalize()-仅用于文本节点

* 自有方法：
> 1. element.getElementsByTagName()
> 2. 操控属性的方法: element.getAttribute(), element.getAttributeNode(), element.setAttribut(), element.setAttributeNode(), element.removeAttribute(), element.removeAttributeNode()

* 创建element节点: document.createElement()

* 扩展的CSS选择符API: element.querySelector(), element.querySelectorAll(), element.matchesSelector()
> 1. element.querySelector(CSS选择符), 接收一个CSS选择符, 返回第一个匹配元素
> 2. element.querySlectorAll(CSS选择符), 接收一个CSS选择符, 返回一个NodeList, 所以返回结果可以用方括号, item()来调用
> 3. element.matchesSelector(), 如果调用元素与该选择符匹配, 返回true; 下面是用能力检测来兼容各浏览器的做法
```js
function matchesSelector(element, selector) {
    if (element.matchesSelector) {
        return element.matchesSelector(selector);
    } else if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
    } else if (element.mozMatchesSelector) {
        return element.mozMatchesSelector(selector);
    } else if (element.webkitMatchesSelector) {
        return element.webkitMatchesSelector(selector);
    } else {
        throw new Error("Not Support matchesSelector");
    }
}
```

* HTML5扩展的方法
> 1. 与类相关方法: document.getElementsByClassName(), 接收一个包含一个或多个**类名的字符串**(不是CSS选择符), 返回一个nodeList类数组对象
> 2. 焦点管理判断方法document.hasFocus()： 一般查询文档哪个元素获得焦点以及确定文档是否获得焦点, 是提高Web应用的无障碍性
> 3. 插入标记: insertAdjacentHTML()方法
> 4. element.scrollIntoView(): 如果给这个方法传入参数true, 或者不传参数, 那么窗口滚动之后会让调用元素的顶部与视口顶部尽量平齐

* **专有扩展**方法:
> 0. element.hasAttribute(),
> 1. element.contains()：判断包含关系
> 2. element.compareDocumentPosition()： 判断两个节点的位置关系, 有1-无关, 2-居前, 4-居后, 8-包含, 16-被包含; 如果返回16效果就和contains一样
```js
function contains(refNode, otherNode) {
    if (typeOf refNode.contains == "function" && (!client.engine.webkit || client.engine.webkit >= 522)) {
        return refNode.contains(otherNode);
    } else if (typeOf refNode.compareDocumentPosition == "function") {
        return !!(refNode.compareDocumentPosition(otherNode) & 16);
    } else {
        var node = otherNode.parentNode;
        do {
            if ( node === refNode) {
                return true;
            } else {
                node = node.parentNode;
            }
        } while (node !== null);

        return false;
    }
}
```
> 3. 滚动相关: element.scrollIntoViewIfNeeded(alignCenterFlag), element.scrollByLines(lineCount), element.scrillByPages(pageCount), 但是还是HTML5的element.scrollIntoView()方法因为已经规范, 所以推荐用element.scrollIntoView()
> 4. element.isEqualNode(), element.isSameNode()

### 一些提示
* 有两类特殊的属性, 一种是style属性, 一种是onclick这样的事件处理程序属性.所以建议取自定义的属性时, 才用getAttribute(方法)
> 1. style属性: 如果用属性element.style来访问则返回一个**对象**, 如果用getAttribute(style)访问返回包含**CSS文本**
> 2. onclick事件处理程序属性: 如果用属性element.onclick来访问返回一个**JS函数**, 如果用getAttribute(onclick)返回**相应代码的字符串**
> 3. 所有返回nodeList的方法因为元素从文档树中删除后, 元素与事件处理程序之间的绑定关系在内存中并没有一并删除， 所以一般性能比较差, 所以在用之前先手工删除要被填的元素的所有事件处理
```js
// 性能差的:
for(var i = 0, len = valuse.length; i < len; i ++>){
    ul.innerHTML +="<li>" + values[i] + "</li>"; 
}
// 性能好的
var itemsHTML = "";
for(var i = 0, len = valuse.length; i < len; i ++>){
    itemsHTML +="<li>" + values[i] + "</li>"; 
}
ul.innerHTML = itemsHTML;
```

# attribute类型
------------------------------------------------------------------------
> 1. nodeType 是2, 
> 2. nodeName是属性名称, 
> 3. nodeVaule是属性值, 
> 4. parentNode是null, 
> 5. 没有子节点

* 属性：{name: xxx, value: xxx, specified: xxx}
> attr.isId, attr.name, attr.value, attr.specified

* 方法: 
> 1. document.createAttribute()
> 2. element.getAttribute(),  element.setAttribut(),  element.removeAttribute(), 
> 3. element.getAttributeNode(), element.setAttributeNode(), element.removeAttributeNode()

* 提示: element.attributes, element.getAttributeNode()都会返回对应的Attr**节点**, 而element.getAttribute()则只返回**属性的值**. 建议用element.getAttribute(),  element.setAttribut(),  element.removeAttribute()

# text类型
------------------------------------------------------------------------
> 1. nodeType 是3, 
> 2. nodeName是#text, 
> 3. nodeVaule是所包含的文本, 
> 4. parentNode是一个Element, 
> 5. 没有子节点

* 属性：
> textNode.length

* 自有方法：
> 1. appendData(text)
> 2. deleteData(offset, count)
> 3. insetData(offset, count)
> 4. replaceData(offset, count, text)
> 5. splitText(offset)
> 6. normalize()
> 7. substringData(offset, count)

* 创建文本节点: document.createTextNode()-会附带ownerDocument属性

* 提示: normalize()方法和splitText()方法是相反的方法

# Comment类型
------------------------------------------------------------------------
> 1. nodeType 是8, 
> 2. nodeName是#comment, 
> 3. nodeVaule是注释的内容, 
> 4. parentNode是Document或者Element, 
> 5. 没有子节点

* 属性：
> commentNode.data(等于commentNode.nodeValue)

* 创建注释节点：document.createComment()

# DocumentType类型
------------------------------------------------------------------------
> 1. nodeType 是10, 
> 2. nodeName是doctype的名称, 
> 3. nodeVaule是null, 
> 4. parentNode是Document, 
> 5. 没有子节点

# DocumentFragment类型
------------------------------------------------------------------------
> 1. nodeType 是11, 
> 2. nodeName是#document-fragment, 
> 3. nodeVaule是null, 
> 4. parentNode是null, 
> 5. 子节点可以是Element, Comment, Text, CDATASction, ProcessingInstruction, EntityReference

* 创建DocumentFragment节点： document.createDocumentFragment()

* 继承自Node类型的方法： 
> appendChild(), insertBefore(), replaceChild(), removeChild(), cloneNode(), hasChildNodes()


