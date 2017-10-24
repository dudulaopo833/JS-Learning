var eventUtil = {
	addHandler: function(element, type, method){
		if (element.addEventListener) {// DOM2 event
			element.addEventListener(type, method, false);
		} else if (element.attachEvent) {// IE event
			element.attachEvent('on'+type, method);
		} else {// DOM0 event
			element['on'+type] = method;
		}
	},

	removeHandler: function(element, type, method){
		if (element.removeEventListener){// DOM2 event remove
			element.removeEventListener(type, method, false);
		} else if (elment.detachEvent) {// IE event remove
			element.detachEvent();
		} else {
			elment['on'+type] = null;
		}
	},

	stopPropagation: function(event){
		if (event.stopPropagation){ // DOM
			event.stopPropagation();
		} else {
			event.cancelBubble = true; // IE
		}
	},

	preventDefault: function(e){
		if (e.preventDefault){ // DOM
			e.preventDefault();
		} else {
			e.returnValue = false; // IE
		}
	},

	getTarget: function(event){
		return event.target? event.target : event.srcElement;
	}, 

	getEvent: function(event){
		return event ? event: window.event;
	},

	getRelatedTarget: function(event){
		if (event.relatedTarget) { // DOM
			return event.relatedTarget;
		} else if (event.toElement) { // IE mouseout
			return event.toElement;
		} else if (event.fromElement) { // IE mouseover
			event.fromElement;
		} else {
			return null;
		}
	},

	getMouseButton: function(event) {
		if (doucment.implementation.hasFeature("MouseEvents", "2.0")){
			return event.button; // DOM
		} else {
			switch (event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0; // 0 - mouse left button
				case 2: 
				case 6:
					return 2; // 2 - mouse right button
				case 4:
					return 1; // 1 - mouse center button
			}
		}
	},

	getMouseWheelDelta: function(event) {
		if (event.wheelDelta) {
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta); // opera 相反
		} else {
			return -event.detail * 40; // firefox(3/-3) need to * 40 = 120
		}
	},

	getCharCode: function(event){
		if (typeof event.charCode == "number"){
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},

	getClipboardText: function(event) {
		var clipboardData = event.clipboardData || window.clipboardData;
		return clipboardData.getData("text");
	},

	setClipboardText: function(event, value) {
		if (event.clipboardData) {
			return event.clipboardData.setData("text/plain", value);
		} else if (window.clipboardData) {
			return window.clipboardData.setData("text", value);
		}
	}
};