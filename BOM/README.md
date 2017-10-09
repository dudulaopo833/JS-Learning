# Broswer Object（都是全局对象）: 
> 有 Window, Location, History, Navigator, Screen 等对象; 其中location, history, navigator, screen 都是window 对象的一个只读引用属性

### 1. [Window Object](https://github.com/dudulaopo833/JS-Projects/blob/master/BOM/BroswerObject_WindowObject.md) 
* Window对象表示浏览器中打开的窗口，包含对浏览器当前页面或者iframe操作的一系列属性和方法; 注意浏览器可以打开多个页面
* Window对象具有双重身份, 它既是JS访问浏览器的接口, 又是JS的global对象
> 1. 作为global对象, 它上面自定义的属性是可以delete的, 但是如果是定义全局变量, 则不能delete; 这是因为var定义的全局变量, 虽然是挂在了window对象上, 但是它的configurable特性是false
```js
window.name = 'alma';
delete window.name; // true
var age = 18;
delete age; // false, 在IE9会报错
alert(window.name); // undefined
alert(age); // 18
```
> 2. 如果直接访问, 没有用var定义过的全局变量, 会报错; 但是如果直接访问window对象上没有定义的属性, 是不会报错, 只会返回undefined; 这个就是访问一个对象的属性, 属性不存在就返回undefined
```js
var newValue = window.oldValue; // 不会报错, 仅仅是访问不到这个属性就返回undefined
var secondValue = oldValue; // ReferenceError: oldValue is undefined
```

### 2. [Location Object](https://github.com/dudulaopo833/JS-Projects/blob/master/BOM/BroswerObject_WindowObject_LocationObject.md): 表示窗口中当前显示的文档(所加载文档)的Web地址(url)的相关信息(**很有用的一个window属性**)
> 很多框架都会基于这个history对象去封装router；也有很多框架是基于location.hash去实现单页应用(不重新加载文档)

### 3. [Navigator Object](https://github.com/dudulaopo833/JS-Projects/blob/master/BOM/BrowserObject_WindowObject_Navigator.md): Navigator对象包含有关浏览器的信息,有插件检测和客户端检测（**一个很有用的window属性**）
> 有些插件或者说框架会去extend这个navigator对象, 比如**cordova**

### 4. History Object: History对象设计来表示窗口的浏览历史.
> 1. 只有history.length一个属性，表示当前浏览器历史列表中的url数量
> 2. 有back(), forward(), go(number|url) 三个方法
> 3. 很多框架都会基于这个history对象去封装router；也有很多框架是基于location.hash去实现单页应用(不重新加载文档)

### 5. Screen Object：Screen对象存放着有关浏览器显示屏幕的信息.(不是很有用的window属性)
* 常用属性： 
width, height, availWidth, availHeight(除了任务栏之后的高度)
colorDepth, fontSmoothingEnabled(启用字体平滑), orientation(横竖屏), updateInterval
* 有时候会用screen对象中的一些属性来调整浏览器窗口的大小
```js
window.resizeTo(screen.availWidth, screen.availHeight);
```

### 6. cookie对象

### 7. XMLHttpRequest对象 (IE的ActiveXObject)
