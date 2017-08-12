# 总结：
> event 有 type, target/srcElement, clientX, offsetX 等属性； 
> event 有 stopPropagation(), preventDefault() 等方法， 在IE中是 cancelBubble， reurnValue属性

> dom元素有 offsetLeft, offsetTop, offsetWidth, offsetHeight, className, innerHTML 等属性, 注意是属性！不是方法， 不要跟jquery混淆了


# 笔记
 > document.getElementsByClassName 不兼容低版本的IE，所以可以自己封装一个 
 > parentNode.getElementsByTagName('*'); //取出父元素的所有子元素
 > oPanel.style.left = event.clientX + 'px';// 必须是style.left，并且值后面需要px单位， 要不然不报错也没有任何动作 
 > var xDis = event.clientX - oPanel.offsetLeft; // event.clientX, event.offsetX 和 dom.offsetLeft;
 > window.onload = drag; // 一定不能立即执行, drag()是错的
   oTtile.onmousedown = mouseDownFun; /// mouse down event, 一定不能立即执行， mouseDownFun()是错的
 > wWith = document.documentElement.clientWidth || document.body.clientWidth, //



