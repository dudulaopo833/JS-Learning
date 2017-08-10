window.onload = function() {
	/////////////////////// dom0 事件
	var btn2 = document.getElementById('btn2');
	btn2.onclick = function(){
		alert("This is DOM0 event");
	}
	// btn2.onclick = null;


	////////////////////// dom2 事件
	var btn3 = document.getElementById('btn3');
	function dom2Event(){
		alert("This is DOM2 event"); 
		// Did not stopPragation		
	};
	btn3.addEventListener('click', dom2Event, false);
	// btn3.removeEventListener('click', dom2Event, false); // false 代表事件冒泡流


	////////////////////// IE 事件
	var btn4 = document.getElementById('btn4');
	function ieEvent(){
		alert("This is IE event");
		// Did not cancelBubble
	}
	// btn4.attachEvent('onclick', ieEvent);
	// btn4.detachEve nt('onclick', ieEvent);// 必须是 onclick


	//////////////////// 浏览器兼容
	var btn5 = document.getElementById('btn5');
	function multipleBroswerEvent(event){
		alert("This event can run in every browser");
		// StopPropagation or cancelBubble
		event = event || window.event;
		eventUtil.stopPropagation(event);
	}
	eventUtil.addHandler(btn5, 'click', multipleBroswerEvent);
	// eventUtil.removeHandler(btn5, 'click', multipleBroswerEvent); 
	

	/////////////////// 读 dom 事件对象属性和方法
	var box = document.getElementById('box');
	function showParentEvent(){
		alert("This is parent box");
	}
	eventUtil.addHandler(box, 'click', showParentEvent);  


	///////////////////// 阻止默认事件
	var link = document.getElementById('link');
	eventUtil.addHandler(link, 'click', function(e){
		e = e || window.e;
		eventUtil.preventDefault(e);
		eventUtil.stopPropagation(e);
	});
	

};