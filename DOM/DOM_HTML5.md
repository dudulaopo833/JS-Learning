# 跨文档消息传递
----------------------------------------------------------
* 跨文档消息传递(cross-document messaging), XDM， 来自不同域的页面间传递消息; 在**不降低同源策略安全性的前提下**
* 核心是postMessage()方法, 有两个参数, 一条消息和一个表示消息接收方来自哪个域的字段
```js
// 注意： 所有支持xdm的浏览器都支持iframe的contentWindow属性
var iframeWindow = document.getElementById("myframe").contentWidth;
iframeWindow.postMessage("A secret", "http://www.wrox.com");
```
* 接收到XDM消息时, 会触发window对象的message事件, 异步触发的. 这个event包含 data, origin, source三个属性; 可以event.source.postMessage()来发送回执
```js
EventUtil.addHandler(window, "message", function(event){
    if(event.origin == "http://wrox.com"){
        processMessage(event.data);
        event.source.postMessage("Received","http://p2p.wrox.com");
    }
});
```

# 原生拖放API
----------------------------------------------------------
* 拖动某元素时, 将依次触发, dragstart, drag, dragend事件
* 当某个元素被拖动到一个有效地放置目标上时, 依次发生dragenter, dragover, dragleave或者drop事件; 如果元素被放置到放置目标中, 触发drop事件而不是dragleave事件
* HTML5规定了draggable属性来定义元素是否可以拖动
## dataTransfer属性对象
### dataTransfer传输数据
* 这个属性对象用于从被拖动元素向放置目标传递字符串格式的数据
* 有两个方法：getData() 和 setData()
* 保存在dataTransfer对象中的数据只能在drop事件中读取
```js
event.dataTransfer.setData("text", "some text");
var text = event.dataTransfer.getData("text");
```
### dataTransfer确定拖动操作
* dataTransfer对象, 可不光是能够传输数据, 还能通过它来确定被拖动的元素以及作为放置目标的元素能够接受什么操作, 依靠dropEffect和effectAllowed
* dropEffect可以知道被拖动的元素能够执行哪种放置行为: none, move, copy, link; dropEffect属性必须在ondragenter事件处理程序中针对放置目标来设置它; dropEffect属性只有搭配feffectAllowed属性才有用
* effectAllowed属性有uninitialized, none, copy, link, move, copyLink, copyMove, linkMove; 必须在ondragstart事件处理程序中设置effectAllowed属性
### dataTransfer其他属性和方法
* 方法: addElement(element); clearData(format); setDragImage(element, x, y); 
* 属性： types

# 媒体元素(音频和视频)
----------------------------------------------------------
* <audio>音频和<vedio>视频
> 1. src属性指向要加载的媒体文件
> 2. width, height属性指定视频播放器大小
> 3. poster属性指定图片的URI可以在加载视频内容期间显示一副图像
> 4. controls属性可以显示UI控件, 方便用户直接操控媒体
* vedio和audio共同属性: src, autoplay, controls, currentLoop, currentTime, duration, ended, loop, muted, paused, played, start, volume
* vedio和audio共同事件：abort, canplay(readyState=2), dataunavailable(readyState=0), pause, play, progress, ratechage
* 可以用play()和pause()两个方法, 可以手工控制媒体文件的播放, 而不用controls属性自带的UI
* 可以用canPlayType()方法来检测编解码器支不支持. e.g. audio.canPlayType("audio/mpeg");

# 历史状态管理
----------------------------------------------------------
* 使用hashchange事件可以知道URL参数发生了什么变化
* HTML5通过更新history对象为管理历史状态提供了方便, 提供了pushState()和replaceState()方法; 
* 但是这个两个方法仅仅是改变历史状态栈和浏览器地址栏, 但是它不会真的向服务器发送请求来加载新的页面
* hash也是仅仅改变浏览器地址栏, 不会触发onload事件; 但是如果用location.search来重新指定地址栏中的search会触发浏览器load事件
* 这两个事件会触发statechange事件, 而如果按浏览器的前进后退则触发window的popstate事件, popstate事件的事件对象有一个state属性, 可以获取传的对象; 也可以直接history.state取得历史栈中的当前state对象
* pushState()/replaceState()不能设置第三个参数为跨域; 如果跨域会报错(Uncaught DOMException: Failed to execute 'pushState' on 'History'); 所以必须同源
```js
history.pushState({name: "Nicholas"}, "title", "nicholas.html"); // 第一个参数就是pushState传的第一个对象
EventUtil.addHandler(window, "popstate", function(event){
    var state= event.state;
    if (state) { // 第一个页面加载时state为空
        processState(state);
    }
})
```
* 如果一直用改变hash来增添了多个历史状态, 那个用history.go()/back(), 仅仅会改变hash而不会去重载页面, 原因就是hash的改变不会加载页面, 因为**发送给服务器的url根本就不包含hash部分**
```js
Google还规定，如果你希望Ajax生成的内容被浏览引擎读取，那么URL中可以使用"#!"，Google会自动将其后面的内容转成查询字符串_escaped_fragment_的值。
比如，Google发现新版twitter的URL如下：
　　http://twitter.com/#!/username
就会自动抓取另一个URL：
　　http://twitter.com/?_escaped_fragment_=/username
```

### 路由
* 路由就是url和处理函数的映射
* route就是一条路由, 而router就是一个机制去管理多个route; 就是接受到一个url, 去路由映射表里找处理函数
* 服务端路由: router在匹配route过程, 除了url, 还有请求的方法post/get来匹配的
> 1. 静态资源服务器, url的映射函数就是文件读取操作
> 2. 动态资源服务器, url的映射函数就是数据库读取操作
* 客户端路由: 路由的映射函数都是处理一些DOM的显示和隐藏操作, 当访问不同url时, 会显示不同的组件
> 1. 基于hash来实现: 发送给服务器的请求url不会包含hash的, [例子参考这里](https://github.com/dudulaopo833/JS-Projects/tree/master/Route_Hash)
> 2. 基于history API来实现: 只改变url, 并不会真的请求, [例子参考这里]()
* 客户端路由的两种方式的比较
> 1. hash路由兼容性更好, history API路由更加直观和正式
> 2. hash路由不需要改动服务器, history API路由需要改动服务器
```js
// 假设服务器有两个文件 index.html 和 script.js; 并且index.html 引用了script.js

// 基于hash的路由有
http://exmaple.com/
http://example.com/#/foobar
// 基于history API的路由有
http://exmaple.com/
http://example.com/foobar

// Step 1: 直接访问http://example.com/ 两种路由行为一致, 返回了index.html
// Step 2： 从 http://example.com/ 跳到 http://example.com/#/foobar 或者 http://example.com/foobar; 因为已经加载了script.js, 所以都能正确处理路由

// 差异: 直接访问 http://example.com/#/foobar 因为hash不会发送给服务器, 所以实际请求 http://example.com, 所以可以正确处理

// 差异： 直接访问 http://example.com/foobar 就真的实际请求这个路径 , 但是服务器其实没有这个路径的, 会返回404错误

// 差异的解决方法: 改造服务端, 使得接受到 http://example.com/foobar 能请求到index.html
```
* 动态路由: restful API中经常有 “/urser/:id" 这种动态路由
* 严格路由: /foobar(类比一个文件) 和 /foobar/(类比一个目录) 是不一样的, 需要看服务器怎么处理
