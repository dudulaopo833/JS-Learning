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
* HTML5通过更新history对象为管理历史状态提供了方便, 提供了pushState()和replaceState()方法; 但是这个两个方法仅仅是改变历史状态栈和浏览器地址栏, 但是它不会真的向服务器发送请求来加载新的页面
```js
history.pushState({name: "Nicholas"}, "title", "nicholas.html");
```