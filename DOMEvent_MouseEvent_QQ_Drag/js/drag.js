// 为了兼容IE浏览器，因为getElmentsByClassName在IE10之前都不兼容
function getByClass(clsName, parentId){
	var parentNode = parentId ? document.getElementById(parentId) : document;
	var returnElement = [];
	var elementToSearch = parentNode.getElementsByTagName('*'); // 把父节点下的所有节点都取出来

	for( var i = 0; i < elementToSearch.length ; i ++ ){
		var temp = elementToSearch[i];
		if(temp.className === clsName){
			returnElement.push(temp);
		}
	}
	return returnElement;
}

window.onload = drag; // 一定不能立即执行, drag()是错的

function drag(){
	var oTtile = getByClass('login_logo_webqq', 'loginPanel')[0];
	//拖拽操作
	oTtile.onmousedown = mouseDownFun; /// mouse down event, 一定不能立即执行， mouseDownFun()是错的
	//关闭操作
	var closeBtn = document.getElementById('ui_boxyClose');
	closeBtn.onclick = function(){
		var oPanel = document.getElementById('loginPanel');
		oPanel.style.display = 'none';
	}
	//切换状态操作
	var showStateBox = document.getElementById('loginState'),
		updateStateDiv = document.getElementById('loginStateShow'),
		updateTextDiv = document.getElementById('login2qq_state_txt'),
		stateListBox = document.getElementById('loginStatePanel'),
		stateList = document.getElementsByTagName('li');

	showStateBox.onclick = function(e){
		stateListBox.style.display = 'block';
		eventUtil.stopPropagation(e);
	}

	document.onclick = function(){
		stateListBox.style.display = 'none';
	}

	for(var i = 0 ; i < stateList.length; i++){
		var tempLi = stateList[i];
		tempLi.onmouseover = function(){
			this.style.background = '#567';
		}
		tempLi.onmouseout = function(){
			this.style.background = '#fff';
		}
		tempLi.onclick = function(e){
			stateListBox.style.display = 'none';
			eventUtil.stopPropagation(e);
			var id = this.id,
				text = getByClass('stateSelect_text', id)[0].innerHTML;
			updateStateDiv.className = '';
			updateStateDiv.className = 'login-state-show ' + id;
			updateTextDiv.innerHTML = text;

		}


	}



}

function mouseDownFun (event){
	event = event || window.event;
	var oPanel = document.getElementById('loginPanel'),
	//光标按下时候光标和面板左边和上边的距离
		xDis = event.clientX - oPanel.offsetLeft,
		yDis = event.clientY - oPanel.offsetTop;
	//移动
	document.onmousemove = function(event){// Must bind in document move
		event = event || window.event;
		moveFun(event, xDis, yDis); //把移动事件传过去
	}
	//释放事件
	document.onmouseup=function(){
	  	document.onmousemove=null;
	  	document.onmouseup=null;
	}
}

function moveFun(event, xDis, yDis){
	var oPanel = document.getElementById('loginPanel'),
		xPos = event.clientX - xDis,
		yPos = event.clientY - yDis,
		wWith = document.documentElement.clientWidth || document.body.clientWidth,
		wHeight = document.documentElement.clientHeight || document.body.clientHeight,
		maxWith = wWith - oPanel.clientWidth - 10,
		maxHeight = wHeight - oPanel.clientHeight;
	// 处理超出视野范围的动作
	if(xPos < 0) {
		xPos = 0;
	}else if(xPos > maxWith){
		xPos = maxWith;
	}
	if(yPos < 0){
		yPos = 10; //因为关闭按钮下移了10， 所以需要上移10
	}else if(yPos > maxHeight){
		yPos = maxHeight;
	}
	oPanel.style.left = xPos + 'px';
	oPanel.style.top = yPos + 'px';
}

var eventUtil = {
	stopPropagation: function(e){
		e = e || window.e;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	}
}