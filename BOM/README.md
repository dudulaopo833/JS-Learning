# Broswer Object（都是全局对象）: 
> 有 Window, Location, History, Navigator, Screen 等对象
### 1. [Window Object](https://github.com/dudulaopo833/JS-Projects/blob/master/BroswerObject_WindowObject.md) 
Window对象表示浏览器中打开的窗口，包含对浏览器或者iframe操作的一系列属性和方法   
 
### 2. [Location Object](https://github.com/dudulaopo833/JS-Projects/blob/master/BroswerObject_WindowObject_LocationObject.md): 表示窗口中当前显示的文档的 Web 地址(url)的相关信息

### 3. History Object: History对象设计来表示窗口的浏览历史.
> a. 只有history.length一个属性，表示当前浏览器历史列表中的url数量
> b. 有back(), forward(), go(number|url) 三个方法
> c. 很多框架都会基于这个history对象去封装router；也有很多框架是基于location.hash去实现单页应用(不重新加载文档)

###  4. Navigator Object: Navigator对象包含有关浏览器的信息.
它的属性描述了正在使用的浏览器，可以用这些属性进行平台专用的配置
> a. navigator.plugins: 列举了浏览器已经安装的插件
> b. navigator的有这些常用的属性： userAgent, cookieEnabled, language, appName, appVersion, appCodeName.
> c. 有些插件或者说框架会去extend这个navigator对象, 比如**cordova**

### 5. Screen Object：Screen对象存放着有关浏览器显示屏幕的信息.
* 常用属性： 
width, height, availWidth, availHeight(除了任务栏之后的高度)
colorDepth, fontSmoothingEnabled(启用字体平滑), orientation(横竖屏), updateInterval
