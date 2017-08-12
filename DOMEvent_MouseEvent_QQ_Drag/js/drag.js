//因为getElementsByClass 在IE10 之前都不兼容， 所以封装下面类似的方法
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
	//拖拽
	var oTitle = getByClassName('login_logo_webqq', 'loginPanel')[0];
	oTitle.onmousedown = mousedownFun; //注意不是是mousedownFun(), 要不然就错了
}

function mousedownFun(e){
	e = e || window.event;
	//计算点击时候光标与panel上边和左边的距离
	var oPanel = document.getElementById('loginPanel'),
		xDis = e.clientX - oPanel.offsetLeft,
		yDis = e.clientY - oPanel.offsetTop;		
	document.onmousemove = function(e){
		e = e || window.event;
		mousemoveFun(e, xDis, yDis);
	}
}

function mousemoveFun(e, xDis, yDis){
	var oPanel = document.getElementById('loginPanel'),
		xPos = e.clientX - xDis,
		yPos = e.clientY - yDis,
		wWidth = document.documentElement.clientWidth || document.body.clientWidth,
		wHeight = document.documentElement.clientHeight || document.body.clientHeight,
		maxXPos = wWidth - oPanel.offsetWidth,
		maxYPos = wHeight - oPanel.offsetHeight;
	//限制各种条件避免panel超出边框
	if(xPos < 0){
		xPos = 0;
	}else if(xPos > maxXPos){
		xPos = maxXPos;
	}

	if(yPos < 0){
		yPos = 0;
	}else if(yPos > maxYPos){
		yPos = maxYPos;
	}
	oPanel.style.left = xPos + 'px';
	oPanel.style.top = yPos + 'px'; //注意加px， 不然不生效
}