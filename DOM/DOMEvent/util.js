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

	stopPropagation: function(e){
		if (e.stopPropagation){
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},

	preventDefault: function(e){
		if (e.preventDefault){
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},

	getTarget: function(e){
		return e.target? e.target : e.srcElement;
	}, 

	getEvent: function(e){
		return e ? e: window.event;
	}
};