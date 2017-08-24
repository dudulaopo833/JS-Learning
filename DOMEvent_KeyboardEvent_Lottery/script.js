var prizeList = [
	'iPhone 7 Plus',
	'iWatch',
	'LG TV',
	'Meidi Cooker',
	'iMac air',
	'Mouse',
	'iPad',
	'Mobike',
	'Travel',
	'Thank you for joining'
];
var timer = null;
var startedFlag = false;

window.onload = function(){
	var showDiv = document.getElementById('showPrize');
	var startBtn = document.getElementById('start');
	var stopBtn = document.getElementById('stop');

	showDiv.innerHTML = "Start to Lottery!";

	// Mouse event
	startBtn.onclick = startFn;
	stopBtn.onclick = stopFn;

	// Keyboard event
	document.onkeyup = function(event){ // onkeyup
		event = event || window.event;
		if (event.keyCode === 13) {
			if (startedFlag === false){
				startFn();
				startedFlag = true;
			} else {
				stopFn();
				startedFlag = false;
			}
		}
	}
}

function startFn(){
	var showDiv = document.getElementById('showPrize');
	var startBtn = document.getElementById('start');
	startBtn.style.background = '#999';
	clearInterval(timer); // Every time to start lottery, need to clean the interval first
	timer = setInterval(function(){
		var random = Math.floor(Math.random()*prizeList.length);
		showDiv.innerHTML = prizeList[random];
	}, 50);
}

function stopFn(){
	clearInterval(timer);
	var showDiv = document.getElementById('showPrize');
	var startBtn = document.getElementById('start');
	startBtn.style.background = '#036';
	showDiv.innerHTML = 'Start to Lottery again!';
}