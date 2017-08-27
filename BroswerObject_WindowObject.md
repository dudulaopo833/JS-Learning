 # Summary：Window对象表示浏览器中打开的窗口
 * 每个窗口或者iframe都会有一个window对象，用于操作这个窗口或者iframe
 * 所以这个window是一个全局对象，它的属性和方法都可以直接访问，不需要加window.前缀. 比如alert(), setInterval(), onload()方法; location, document 属性
 * 每个window对象，都有history, document, navigator, screen对象的只读引用属性; 所以也可以直接不需要window.前缀来用这些引用对象
 * 每个window对象，都有location对象属性， [location对象]()用于操作url // TODO:
 
 ## 窗口操作
 * 只读属性 ： closed, defaultstatus, innerwidth, innerheight, name, status, outerwidth, outerheight, pageXOffset, pageYOffset, screenX, screenY, screenLeft, screenTop, 
 * 常用方法: alert(), setInterval(), setTimeout(), clearInterval(), clearTimeout(), scrollTo(x,y)
 * 不常用方法： open(), close(), prompt(), confirm(), blur(), focus(), print()
 
 
 ## 窗口之间的操作
 * 打开一个窗口, 用 window.open('xxx.local.url.xx'); 那么可以在打开的窗口中用 window.opener属性或者window.parent属性来找到其父窗口. 那么也可以用window.close();来关闭打开的窗口
 * 加入一个窗口中， 有多个iframe， 那么可以用window.frames.length(or window.length)来知道有多少个iframe; 可以种window.frames[i]来取到那个iframe的引用
 * 可以用window.top属性来找到顶层窗口
 * 窗口有self属性和window属性来指向它自己，所以这些写法都是相等的: window.parent, self.parent, parent(省略window)
