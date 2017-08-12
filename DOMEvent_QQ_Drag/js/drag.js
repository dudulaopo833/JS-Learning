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

window.onload = drag;

function drag(){
	var oTtile = getByClass('login_logo_webqq', 'loginPanel')[0];
	console.log(oTtile);
	oTtile.onmousedown = mouseDownFun(); /// mouse down event
}

function mouseDownFun (){
	var oPanel = document.getElementById('loginPanel');
	document.onmousemove = function(event){// Must bind in document move
		event = event || window.event;
		oPanel.style.left = event.clientX + 'px';
		oPanel.style.top = event.clientY + 'px';
	}
}