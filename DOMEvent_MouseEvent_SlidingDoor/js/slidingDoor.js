window.onload = function(){
	var container = document.getElementById('container'),
		imgArray = container.getElementsByTagName('img'),
		imgWidth = imgArray[0].offsetWidth,
		exposeWidth = 100,
		boxWidth = imgWidth + (imgArray.length - 1) * exposeWidth;
		container.style.width = boxWidth + 'px';

		function resetImage(){
			for(var i = 1; i < imgArray.length; i ++){
				imgArray[i].style.left = imgWidth + exposeWidth * (i - 1) + 'px';
			}
		}

		resetImage();

		var translateDis = imgWidth - exposeWidth;
		//为每道门设置打开时的移动距离
		for(var i = 0; i < imgArray.length; i ++){
			//用立即执行函数， 为了获取不同的i值
			(function(i){
				imgArray[i].onmouseover = function(){
					resetImage(); // 充值图片位置，然后从第二章图片开始算相应的位置
					for(var j = 1; j <= i ; j ++){
						imgArray[j].style.left = parseInt(imgArray[j].style.left,10) - translateDis + 'px';
					}
				}
			})(i);
		}

				
}