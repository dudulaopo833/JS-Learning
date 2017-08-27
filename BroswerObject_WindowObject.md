 # Summary：
 * 每个窗口或者iframe都会有一个window对象，用于操作这个窗口或者iframe
 * 所以这个window是一个全局对象，它的属性和方法都可以直接访问，不需要加window.前缀. 比如alert(), setInterval(), onload()方法; location, document 属性
 * 每个window对象，都有history, document, navigator, screen对象的只读引用; 所以也可以直接不需要window.前缀来用这些引用对象
 * 每个window对象，都有location对象， [location对象]()用于操作url // TODO:
 
 ## 窗口之间的操作
 * 打开一个窗口, 用 window.open('xxx.local.url.xx'); 那么可以在打开的窗口中用 window.opener属性或者window.parent来找到其父窗口. 那么也可以用window.close();来关闭打开的窗口
 * 加入一个窗口中， 有多个iframe， 那么可以用window.frames.length来知道有多少个iframe; 可以种window.frames[i]来取到那个iframe的引用
