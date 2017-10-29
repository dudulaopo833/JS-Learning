# 事件流: 事件流描述的是页面中接收事件的顺序
------------------------------------------------------------------------
* 事件冒泡 - IE和大多数浏览器都支持
* 事件捕获 
> DOM2级事件规定事件流包括三个阶段: 事件捕获阶段, 处于目标阶段, 和事件冒泡阶段

# 事件处理程序类型
------------------------------------------------------------------------
* HTML事件 （onclick in html）
> 缺点： html和js代码耦合性太强， 不能添加多个函数
* DOM0级事件 （onclick in js）：函数赋值给一个事件处理程序**属性**
> 1. 优点： html和js代码分离; **浏览器兼容性好**; 可以添加多个事件; 事件在元素的作用域运行, this引用当前元素
> 2. 缺点： 事件移除方式不雅观
* DOM2级事件 （addEventListener, removeEventListener）
> 1. 优点： html和js代码分离; 可以添加多个事件;
> 2. 缺点： 不兼容IE8以下的浏览器; 不能移除addEventListener添加的匿名方法
> 3. 提示： 事件类型是 click 这种; 按添加顺序触发
* IE事件（IE8以下）(attachEvent, detachEvent) 
> 1. 提示： 事件类型是 onclick 这种; 按添加顺序相反顺序触发
> 2. 缺点： 不能移除attachEventr添加的匿名方法; attachEvent添加的事件是全局作用域运行的, this是window

# 事件对象: 在触发DOM上的某个事件时, 会产生一个事件对象event
------------------------------------------------------------------------
* DOM 事件对象
> 1. 有event 对象
> 2. 共有属性: type, targert, currentTarget(this), detail, bubbles, cancelable, defaultPrevented, eventPhase, trusted
> 3. 共有方法：stopPropagation(), preventDefault(), stopImmediatePropagation()
* IE 事件对象（IE8以下）
> 1. 只有 window.event 对象
> 2. 共有属性：type, srcElement, cancelBubble, returnValue
> 3. cancelBubble, returnValue（false 为阻止默认事件）属性对应DOM事件对象的stopPropagation(), preventDefault()方法

# 事件类型: 
> 1. UI事件, 焦点事件, 鼠标事件, 滚轮事件, 键盘事件, 文本事件, 合成事件, 变动(mutation)事件
> 2. 所有事件在html事件, DOM0中和IE事件中都需要加上on, e.g. onclick, onkeydown; 但是在DOM2级中就直接用
------------------------------------------------------------------------
### 1. UI事件
* 常用UI事件有: load, unload, scroll, resize, select(<input>,<texterea>)
* unload事件一般用于清楚引用, 避免内存泄漏
### 2. 焦点事件
* HTML事件: focus(不冒泡), blur(不冒泡)
* DOM3事件：focusin(冒泡, 对应focus), focusout(冒泡, 对应blur)
### 3. 鼠标与滚轮事件
* 常用事件: click, dbclick, mousedown, mouseup, mousemove, mouseenter(不冒泡), mouseleave(不冒泡), mouse out, mouseover, mousewheel(滚轮事件)
* 鼠标事件对象的常用属性
> 1. 关于坐标的属性: clientX, clientY(客户区坐标); pageX, pageY(页面坐标, 没有滚动情况下, 与客户区坐标值相等); screenX, screenY(屏幕坐标)
> 2. 修改键属性: shiftKey, ctrlKey, altKey, metaKey
> 3. 相关元素属性: relatedTarget, IE中有fromElment, toElement
> 4. 鼠标按钮属性: button(0, 1, 2)
> 5. 更多属性: detail, IE中的offsetX, offsetY
> 6. 滚轮事件属性: wheelDelta
### 4. 键盘和文本事件
* keydown(任意键), keyup, keypress(字符键), textInput(文本事件,DOM3)
* keydown, keypress是在文本框发生变化之前触发; keyup在文本框已经发生变化后触发
* 任何可以获得焦点的元素都可以触发keypress事件, 但只有可编辑区域才能触发textInput事件; textInput事件只会在用户按下能够输入实际字符键才触发, keypress事件则再按下能够影响文本显示的键时触发(退格键)
* 常用属性: 
> 1. 键盘事件属性: keyCode(keydown,keyup), charCode(keypress), key/char(DOM3)
> 2. 文本事件属性: data(用户输入的字符), inputMethod
### 5. 变动事件
* 可能用于库中优化DOM事件
* 删除节点的触发事件过程: 使用removeChild()和replaceChild()从DOM中删除节点，触发DOMNodeRemoved事件(节点尚未从其父节点删除); 再触发DOMNodeRemovedFromDocument事件; 最后触发的是DOMSubtreeModified事件
* 插入节点的触发事件过程: 使用appendChild(), replaceChild(), insertBefore向DOM中插入节点, 触发DOMNodeInserted事件(节点以及插入到新的父节点中); 再触发DOMNodeInsertedIntoDocument事件; 最后触发DOMSubtreeModified事件
### 6. HTML5事件
* 常用： DOMContentLoaded(DOMReady实现策略), readystatechange, hashchange
* 其他：contextmenu事件(上下文菜单-右击/ctrl+click), beforeunload(卸载前弹框阻止卸载-returnValue为要显示的message), pageshow, pagehide, abort, drag, dragstart, dragend, dragenter, dragover, dragleave/drop, error, message, mousewheel resize, scroll, unload
### 7. 设备事件
* IOS设备: orientationchange(window.orientation)
* MozOrientation, deviceorientation(可用于重力检测), devicemotion(可用于手机检测运动)
### 8. 触摸与手势事件
* 触摸事件： touchstart, touchmove, touchend; 都可以冒泡, 每个触摸事件的event对象都提供了鼠标事件常见属性(bubbles,  cancelable, view, clientX, clientY, screenX, screenY, detail, altKey, shiftKey, altKey, ctrlKey, metaKey); 除此还有touches, targetTouches, changeTouches三个Touch对象数组, 每个touch对象都有identifier, target, clientX/Y, pageX/Y, screenX/Y
* 在触摸屏上事件的发生顺序是: touchstart->mouseover->mousemove->mousedown->mouseup->click->touchend
* 手势事件：gesturestart, gesturechange, gestureend; 每个手势事件的event对象都提供了鼠标事件属性(bubbles, cancelable, view, clientX, clientY, screenX, screenY, detail, altKey, shiftKey, ctrlKey, metaKey); 此外包含两个属性rotation和scale
### 9. 表单事件
* 传统表单事件: submit, reset, change, select
* 剪贴板事件: beforecopy, copy, beforecut, cut, beforepaste, paste

# 内存和性能 
------------------------------------------------------------------------
* 原因： 
> 1. 因为事件函数都是对象, 占用内存; 对象越多, 内存性能越差
> 2. 事件处理程序需要绑定到DOM元素, 涉及DOM访问次数增加, 延迟了页面交互就绪时间
* 解决方案：
> 1. 事件委托可以解决事件处理程序过多的问题, 常用语click, mousedown, mouseup, keydown, keyup, keypress这些事件中
> 2. 移除事件处理程序可以解决内存中的"空事件处理程序", 常见的是在innerHTML改变前去手动移除事件处理程序, unload事件中移除所有事件处理程序

# 模拟事件(可用于自动化测试)
------------------------------------------------------------------------
* DOM中事件模拟： document.createEvent(type-UIEvents/MouseEvents/MutationEvents/HTMLEvents)创建事件对象 -> 初始化创建的事件对象initMouseEvent() -> dispatchEvent()触发事件
```js
var btn = document.getElementById("myBtn");
var event = document.createEvent("MouseEvents");
event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
btn.dispatchEvent(event);
```
* 模拟键盘事件(DOM3)： document.createEvent("KeyboardEvent) -> 初始化事件initKeyboardEvent() -> dispatchEvent()触发事件
```js
if (document.implementation.hasFeature("KeyboardEvents", "3.0")) {
	var textbox = document.getElementById("myTextbox");
	var event = document.createEvent("KeyboardEvent");
	event.initKeyboardEvent("keydown", true, true, document.defaultView, "a", 0, "Shift", 0);
	textbox.dispatchEvent(event);
} 
```
* 模拟其他事件，比如Mutation事件(DOMNodeInserted)
* 模拟IE事件: document.createEventObject()创建event对象 -> 手工添加事件属性 -> fireEvent()触发事件

# 浏览器兼容的事件对象 - 能力检测 
------------------------------------------------------------------------
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
	},

	getEvent: function(e){
		return e ? e: window.event;
	}
};
````
	
