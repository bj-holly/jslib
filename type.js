var is = {
	types : [ "Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument" ]
};

for (var i = 0, c; c = is.types[i++];) {
	is[c] = (function(type) {
		return function(obj) {
			return Object.prototype.toString.call(obj) == "[object " + type + "]";
		};
	})(c);
}

alert(is.Array([])); // true
alert(is.Date(new Date)); // true
alert(is.RegExp(/reg/ig)); // true