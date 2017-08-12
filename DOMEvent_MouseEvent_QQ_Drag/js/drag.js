//因为getElementsByClassName 在IE10 之前都不兼容， 所以封装下面类似的方法
function getByClassName(className, parentID){
	var parentNode = parentID ? document.getElementById(parentID) : document,
		returnArray = [],
		childrenList = parentNode.getElementsByTagName('*');
	for(var i = 0; i < childrenList.length; i++ ){
		var temp = childrenList[i];
		if(temp.className === className){
			returnArray.push(temp);
		}
	}
	return returnArray;
}

window.onload = drag; //注意不是是drag(), 要不然就错了

function drag(){
	//拖拽操作
	var oTitle = getByClassName('login_logo_webqq', 'loginPanel')[0];
	oTitle.onmousedown = mousedownFun; //注意不是是mousedownFun(), 要不然就错了
	//关闭panel操作
	var closeBtn = document.getElementById('ui_boxyClose'),
		oPanel = document.getElementById('loginPanel');
	closeBtn.onclick = function(){
		oPanel.style.display = 'none';
	}
	//切换状态操作
	toggleStatus();
}

function mousedownFun(e){
	e = e || window.event;
	//计算点击时候光标与panel上边和左边的距离
	var oPanel = document.getElementById('loginPanel'),
		xDis = e.clientX - oPanel.offsetLeft,
		yDis = e.clientY - oPanel.offsetTop;
	//移动		
	document.onmousemove = function(e){
		e = e || window.event;
		mousemoveFun(e, xDis, yDis);
	}
	//释放move 事件
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

function mousemoveFun(e, xDis, yDis){
	var oPanel = document.getElementById('loginPanel'),
		xPos = e.clientX - xDis,
		yPos = e.clientY - yDis,
		wWidth = document.documentElement.clientWidth || document.body.clientWidth,
		wHeight = document.documentElement.clientHeight || document.body.clientHeight,
		maxXPos = wWidth - oPanel.offsetWidth - 10,
		maxYPos = wHeight - oPanel.offsetHeight;
	//限制各种条件避免panel超出边框
	if(xPos < 0){
		xPos = 0;
	}else if(xPos > maxXPos){
		xPos = maxXPos;
	}

	if(yPos < 0){
		yPos = 10; //因为关闭按钮左上都缩进了10px
	}else if(yPos > maxYPos){
		yPos = maxYPos;
	}
	oPanel.style.left = xPos + 'px';
	oPanel.style.top = yPos + 'px'; //注意加px， 不然不生效
}

var eventUtil = {
	stopPropagation: function(e){
		e = e || window.event;
		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	}
}

function toggleStatus(){
	var statusBox = document.getElementById('loginState'),
		showStatusDiv = document.getElementById('loginStateShow'),
		showTextDiv = document.getElementById('login2qq_state_txt'),
		statusUL = document.getElementById('loginStatePanel'),
		statusLI = document.getElementsByTagName('li');
	statusBox.onclick = function(e){
		statusUL.style.display = 'block';
		eventUtil.stopPropagation(e);
	}

	document.onclick = function(){
		statusUL.style.display = 'none';
	}

	for(var i =0; i< statusLI.length; i ++){
		var temp = statusLI[i];
		temp.onmouseover = function(){
			this.style.background = '#567';
		}
		temp.onmouseout = function(){
			this.style.background = '#fff';
		}
		temp.onclick = function(e){
			var id = this.id;
			statusUL.style.display = 'none';
			eventUtil.stopPropagation(e);
			showStatusDiv.className = '';
			showStatusDiv.className = 'login-state-show ' + id;
			showTextDiv.innerHTML = getByClassName('stateSelect_text', id)[0].innerHTML;
		}
	}
}