# 技巧
 > document.getElementsByClassName 不兼容低版本的IE，所以可以自己封装一个 
 > parentNode.getElementsByTagName('*'); //取出父元素的所有子元素
 > oPanel.style.left = event.clientX + 'px';// 必须是style.left，并且值后面需要px单位， 要不然不报错也没有任何动作 