# 事件流
* 事件冒泡 - IE和大多数浏览器都支持
* 事件捕获 

# 事件类型
* HTML事件 （onclick in html）
	> 缺点： html和js代码耦合性太强， 不能添加多个函数
* DOM0级事件 （onclick in js）
	> 优点： html和js代码分离， 浏览器兼容性好， 可以添加多个事件
	> 缺点： 事件移除方式不雅观
* DOM2级事件 （addEventListener, removeEventListener）
 	> 优点： html和js代码分离， 可以添加多个事件
 	> 缺点： 不兼容IE8以下的浏览器
 	> 提示： 事件类型是 click 这种 
* IE事件（IE8以下）(attachEvent, detachEvent) 
	> 提示： 事件类型是 onclick 这种

# 浏览器兼容 - 能力检测 
对于DOM2事件对象，IE不是很支持，反而IE有自己的一套事件对象，所以经常需要用能力检测来处理
```js
var eventUtil = {
	addHandler: function(element, type, method){
		if (element.addEventListener) {// DOM2 event
			element.addEventListener(type, method, false);
		} else if (element.attachEvent) {// IE event
			element.attachEvent('on'+type, method);
		} else {// DOM0 event
			element['on'+type] = method;
		}
	},

	removeHandler: function(element, type, method){
		if (element.removeEventListener){// DOM2 event remove
			element.removeEventListener(type, method, false);
		} else if (elment.detachEvent) {// IE event remove
			element.detachEvent();
		} else {
			elment['on'+type] = null;
		}
	},

	stopPropagation: function(e){
		if (e.stopPropagation){
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},

	preventDefault: function(e){
		if (e.preventDefault){
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},

	getTarget: function(e){
		return e.target? e.target : e.srcElement;
	}
};
````

# 事件对象
* DOM 事件对象
 	> event 对象
	> type, targert, clientX, clientY 属性
	> stopPropagation, preventDefault 方法
* IE 事件对象（IE8以下）
	> 只有 window.event 对象
	> type, srcElement, clientX, clientY 属性
	> cancelBubble, returnValue（false 为阻止默认事件） 属性

!!!!!!!!!!!!!!!!!!!!!!!!
# event对象
------------------------------------------------------------------------
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
	
