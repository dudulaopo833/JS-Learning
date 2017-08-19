function myDomReady(fn){
	//对于现代浏览器或者高版本的IE， 就用DOMContentLoaded事件
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', fn, false);
	} else {//对于低版本的浏览器， 就用doscroll方法判断
		IEContentLoaded(fn);
	}

	function IEContentLoaded(fn){
		var d = window.document;
		var done = false;

		// 只执行一次的init方法； 用done来确保只执行一次
		var init= function(){
			if(!done){
				done = true;
				fn();
			}
		};

		//监听document state 有没有变化，如果state变了，代表所有资源已经加载完成了； 所以执行事件
		d.onreadystatechange = function(){
			//如果domReady之后
			if(d.readyState === 'complete'){
				d.onreadystatechange = null;
				init();
			}
		};

		//在document state没有执行前，实时监听doScroll来判断dom加载状态
		(function(){
			try{
				// 如果dom树没有构建完了，执行doscroll就会报错
				d.docuemntElement.doscroll('left');
			}catch (e){
				setTimeout(arguments.callee, 50); // arguments.callee 表示调用自身
				return;// return实现递归
			}

			// 如果dom树已经构建完了
			init();
		})();
	}
}