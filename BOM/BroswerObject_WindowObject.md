 # Summary：Window对象表示浏览器中打开的窗口
 * 每个窗口或者iframe都会有一个window对象，用于操作这个窗口或者iframe
 * 所以这个window是一个全局对象，它的属性和方法都可以直接访问，不需要加window.前缀. 比如alert(), setInterval(), onload()方法; location, document 属性
 * 每个window对象，都有history, document, navigator, screen对象的只读引用属性; 所以也可以直接不需要window.前缀来用这些引用对象
 * 每个window对象，都有location对象属性， [location对象](https://github.com/dudulaopo833/JS-Projects/blob/master/BroswerObject_WindowObject_LocationObject.md)用于操作url
 
 ## 窗口操作
 * 只读属性 ： closed, defaultStatus, name, status, pageXOffset, pageYOffset,
 > 窗口大小： innerWidth, innerHeight, outerWidth, outerHeight,     
 > 窗口位置： screenX, screenY, screenLeft, screenTop,     
 * 常用方法: alert(), setInterval(), setTimeout(), clearInterval(), clearTimeout(), scrollTo(x,y), getComputedStyle()[refer to](http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/), getPropertyValue()
 * 不常用方法： open(), close(), prompt(), confirm(), blur(), focus(), print()
 
 
 ## 窗口之间的操作(窗口关系)
 * 假如一个窗口中，有多个iframe， 那么可以用window.frames.length(or window.length)来知道有多少个iframe; 可以种window.frames[i]来取到那个iframe的引用
 * 可以用window.top属性来找到顶层窗口; 即top指向最外层(最高)的frame, 即浏览器窗口
 * 窗口有self属性和window属性来指向它自己，所以这些写法都是相等的: window.parent, self.parent, parent(省略window)
 ```js
 **提示**: 由于每个window对象都包含原生类型的构造函数, 即每个frame有自己的一套构造函数, 这些构造函数一一对应, 但是不相等; 所以跨frame传递的对象不能使用intanceOf操作符
 ```

 ## 窗口的位置
 * 属性: screenLeft(screenTop), screenX(screenY); 不同浏览器支持不一样的属性
 * 以下方式可以跨浏览器使用
 ```js
 var leftPos = (typeOf window.screenLeft == "number") ? window.screenLeft : window.screenX;
 var topPos = (typeOf window.screenTop == "number") ? window.screenTop : window.screenY;
 ```
 * 在最外层window对象中, 可以使用moveTo(), moveBy()方法来移动; 但这两个方法可能被浏览器禁用
 ```js
 window.moveTo(0, 0); // 窗口移动到屏幕左上角
 window.moveBy(0, 100); //窗口向下移动100像素
 ```

 ## 窗口大小
 * 属性： innerWidth(innerHeight), outerWidth(outerHeight); 一般来说, innerXXX是返回可视窗口的大小, outerXXX是返回浏览器窗口大小; 但是不同浏览器对这两个属性的定义不一样
 * DOM也提供了页面可见区域的相关信息: document.documentElement.clientWidth(clientHeight), document.body.clientWidth(clientHeight); 用documentElement还是body取决于标准模式还是混杂模式(document.compatMode)
 * 以下方式可以跨浏览器使用
 ```js
 var pageWidth = window.innerWidth;
 var pageHeight = window.innerWidth;
 if( typeOf pageWidth !== "number") {
     if(document.compatMode == "CSS1Compt") { // 标准模式
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
     } else {
         pageWidth = document.body.clientWidth;
         pageHeight = document.body.clientHeight;
     }
 }
 ```
 * 在最外层window对象中, 可以使用resizeTo(), resizeBy()方法来改变窗口大小; 但这两个方法可能被浏览器禁用

 ## 导航和打开窗口
 * window.open()方法可以打开新的窗口, 接受四个参数: 窗口url, 窗口目标(可以是_self,_parent,_top,_blank), 特性字符串, 是否取代浏览器历史记录中的当前页
 ```js
 window.open('http://www.baidu.com', 'windowName', 'height=400,width=400,left=10,top=10,resizable=yes', false)
 ```
  * 打开一个窗口, 用 window.open('xxx.local.url.xx'); 那么可以在打开的窗口中用 window.opener属性或者window.parent属性来找到其父窗口. 那么也可以用window.close()来关闭打开的窗口; 可以用window.closed属性来判断窗口是否关闭
  * 如果窗口的window.opener=null, 表示告诉浏览器新创建的标签页不需要与其他标签页通信
  * 大多数浏览器都内置弹出窗口屏蔽程序(window.open()返回null); 或者有浏览器扩展的其他程序阻止弹出窗口(window.open()抛出错误)
  ```js
  var blocked = false;
  try {
      var win = window.open('http://www.baidu.com', '_blank');
      if (win == null) {
          blocked = true;
      }
  } catch(ex) {
      blocked = true;
  }
  if (blocked) {
      alert('The popup was blocked.');
  }
  ```

  ## 系统对话框
  同步： alert(), confirm(), prompt()
  异步： print(), find()

  ## 超时调用&间歇调用
  * JS是单进程, 有一个JS任务队列; 超时调用意思是x时间后添加到任务队列
  * 超时调用setTimeout()/clearTimieout(id); 间歇调用setInterval()/clearInterval(); 间歇调用与超时调用类似, 但是间歇调用是会按照指定的时间间隔**重复**执行代码, 直到间歇调用被取消或者页面被卸载
  * 使用超时调用来模拟间歇调用是最佳模式，因为间歇调用的后一个执行可能在前一个执行还没有结束前就被触发
  ```js
  var num = 0;
  var max = 10; 
  var intervalID = null;
  function increaceNumber(){
      num ++;

      if(num == max){
          clearInterval(intervalID);
          alert('Done');
      }
  }

  intervalID = setInterval(increaceNumber, 500);
  ```
  用超时调用来模拟间歇调用
  ```js
  var num = 0;
  var max = 10; 
  function increaceNumber(){
      num ++;

      if(num <= max){
          setTimeout(increaceNumber, 500); // 迭代调用
      } else {
          alert('Done');
      }
  }

  setTimeout(increaceNumber, 500);
  ```