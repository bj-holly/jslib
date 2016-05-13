/***********************************************/
/*	   		        字符串				       */
/***********************************************/

/**
 * 判断目标字符串是否包含另一个字符串
 * @param {String} target 目标字符串
 * @param {String} str 包含字符串
 * @param {String} separator 分隔符，可空
 * @return {Boolean}
 */
function contains(target, str, separator) {
	return separator ? 
		   (separator + target + separator).indexOf(separator + str + separator) > -1 :
		   target.indexOf(str) > -1;
}

/**
 * 判断目标字符串是否以一个字符串开始
 * @param {String} target 目标字符串
 * @param {String} str 开始字符串
 * @param {Boolean} ignoreCase 忽略大小写，可空，默认false
 * @return {Boolean}
 */
function startWith(target, str, ignoreCase){
	var startStr = target.substr(0, str.length);
	return ignoreCase ? 
		   startStr.toLowerCase() === str.toLowerCase() : 
		   startStr === str;
}

/**
 * 判断目标字符串是否以一个字符串结尾
 * @param {String} target 目标字符串
 * @param {String} str 结尾字符串
 * @param {Boolean} ignoreCase 忽略大小写，可空，默认false
 * @return {Boolean}
 */
function endWith(target, str, ignoreCase){
	var endStr = target.substring(target.length - str.length);
	return ignoreCase ? 
		   endStr.toLowerCase() === str.toLowerCase() : 
		   endStr === str;
}

/**
 * 将字符串重复自身N次
 * @param {String} target 目标字符串
 * @param {Number} n 重复次数
 * @return {String}
 */
function repeat(target, n){
	var s = target, total = "";
	while(n > 0){
		if(n % 2 === 1)	total += s;
		if(n === 1)	break;
		s += s;
		n = n >> 1;
	}
	return total;
}

/**
 * 获取一个字符串的字节长度
 * @param {String} target 目标字符串
 * @param {Number} fix 定制存储字节数，比如mysql一个汉字3个字节，可空，默认2
 * @return {Number}
 */
function byteLen(target, fix){
	fix = fix || 2;
	var str = new Array(fix + 1).join("-");
	return target.replace(/[^\x00-\xff]/g, str).length;
}

/**
 * 将字符串截断处理
 * @param {String} target 目标字符串
 * @param {Number} length 截取后的长度，包括替换符
 * @param {String} truncation 替换符，可空，默认"..."
 * @return {String}
 */
function truncate(target, length, truncation){
	truncation = truncation || "...";
	return target.length > length ? 
		   (
				truncation.length >= length ? 
				target.slice(0, length) : 
				target.slice(0, length - truncation.length) + truncation
		   ) :
		   target;
}

/**
 * 转为驼峰风格
 * @param {String} target 目标字符串
 * @param {Boolean} ignoreFirstLetter 忽略首字母，可空，默认false
 * @return {String}
 */
function camelize(target){
	if(target.indexOf('-') < 0 && target.indexOf('_') < 0){
		return target;
	}
	return target.replace(/[-_][^-_]/g, function(match){
		return match.charAt(1).toUpperCase();
	});
}

/**
 * 转为下划线风格
 * @param {String} target 目标字符串
 * @return {String}
 */
function underscored(target){
	return target.replace(/([a-z\d])([A-Z])/g, "$1_$2")
		   .replace(/\-/g, "_").toLowerCase();
}

/**
 * 转为中横线风格
 * @param {String} target 目标字符串
 * @return {String}
 */
function dasherize(target){
	return target.replace(/([a-z\d])([A-Z])/g, "$1-$2")
		   .replace(/\_/g, "-").toLowerCase();
}

/**
 * 首字母大写
 * @param {String} target 目标字符串
 * @return {String}
 */
function capitalize(target){
	return 	target.charAt(0).toUpperCase() + target.substring(1).toLowerCase();
}

/**
 * 移除字符串中的html标签
 * @param {String} target 目标字符串
 * @return {String}
 */
function stripTags(target){
	return target.replace(/<[^>]+>/g, "");
}

/**
 * 移除字符串中的script标签
 * @param {String} target 目标字符串
 * @return {String}
 */
function stripScripts(target){
	return target.replace(/<script[^>]*>([\S\s]*?)<\/script>/img, "");
}

/**
 * 将字符串经过html转义，适合在页面中显示
 * @param {String} target 目标字符串
 * @return {String}
 */
function escapeHTML(target){
	return target.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#39;");
	
}

/**
 * 将字符串转义为html标签
 * @param {String} target 目标字符串
 * @return {String}
 */
function unescapeHTML(target){
	return target.replace(/&amp;/g, "&")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				.replace(/&quot;/g, "\"")
				.replace(/&#39;/g, "'");
	
}

/**
 * 将字符串安全格式化为正则表达式的源码
 * @param {String} target 目标字符串
 * @return {String}
 */
function escapeRegExp(target){
	return target.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
}

/**
 * 不足长度时，左侧补0
 * @param {String|Number} target 目标字符串
 * @param {Number} n 长度
 * @return {String}
 */
function pad(target, n){
	var len = target.toString().length;
	while(len < n){
		target = "0" + target;
		len++;
	}
	return target;
}

/**
 * 格式化字符串(替换模板中的占位符:#{0-n} || #{key})
 * 例如：format("name:#{0} age:#{1}", "zhangsan", 18) 或者 format("name:#{name} age:#{age}", {name:"zhangsan",age:18})  
 * @param {String} target
 * @param {Object} object
 * @return {String}
 */
function format(target, object){
	var array = Array.prototype.slice.call(arguments, 1);
	return target.replace(/\\?\#{([^{}]+)\}/gm, function(match, name){
		if(match.charAt(0) == "\\"){
			return match.slice(1);
		}
		var index = Number(name);
		if(index >= 0){
			return array[index];
		}
		if(object && object[name] != void 0){
			return object[name];
		}
		return "";
	});
}

/**
 * 在字符串两端加双引号，内部需要转义的地方都转义，用于拼装JSON
 * escapeable和meta可以提取到方法外部的常量中，不用每次调用都创建。
 * @param {String} target
 * @return {String}
 */
function quote(target){
	var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
		meta = {
			'\b' : '\\b',
			'\t' : '\\t',
			'\n' : '\\n',
			'\f' : '\\f',
			'\r' : '\\r',
			'"' : '\\"',
			'\\' : '\\\\'
		};
	if(target.match(escapeable)){
		return '"' + target.replace(escapeable, function(match){
			var c = meta[match];
			if(typeof c === "string"){
				return c;
			}
			return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
		}) + '"';
	}
	return '"' + target + '"';
}

/**
 * 将字符串安全格式化为正则表达式的源码
 * @param {String} target 目标字符串
 * @return {String}
 */
function trim(target){
	var whiteSpace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	for(var i = 0, l = target.length; i < l; i++){
		if(whiteSpace.indexOf(target.charAt(i)) === -1){
			target = target.substring(i);
			break;
		}
	}
	for( i = target.length - 1; i >= 0; i--){
		if(whiteSpace.indexOf(target.charAt(i)) === -1){
			target = target.substring(0, i + 1);
			break;
		}
	}
	return whiteSpace.indexOf(target.charAt(0)) === -1 ? target : "";
}

/***********************************************/
/*	   		        数组				       */
/***********************************************/

/**
 * 判断数组是否包含指定目标
 * @param {Array} target 目标数组
 * @param {String|Number} item 包含的目标
 * @return {Boolean}
 */
function contains(target, item){
	return target.indexOf(item) > -1;
}

/**
 * 移除数组中指定位置的元素，返回成功与否
 * @param {Array} target 目标数组
 * @param {Number} item 移除元素的索引
 * @return {Boolean}
 */
function removeAt(target, index){
	return !!target.splice(index, 1).length;
}

/**
 * 移除数组中第一个匹配的元素，返回成功与否
 * @param {Array} target 目标数组
 * @param {String|Number} item 移除的元素
 * @return {Boolean}
 */
function remove(target, item){
	var index = arget.indexOf(item);
	if(~index){
		return !!target.splice(index, 1).length;
	}
	return false;
}

/**
 * 对数组进行洗牌
 * @param {Array} target 目标数组
 * @return {Array}
 */
function shuffle(target){
	var j, x, i = target.length;
	
	while(i > 0){
		j = Math.floor(Math.random() * i--);
		x = target[i];
		target[i] = target[j];
		target[j] = x;
	}
	
	return target;
}

/**
 * 随机从数组中选择一个元素
 * @param {Array} target 目标数组
 * @return {Array}
 */
function random(target){
	return target[Math.floor(Math.random() * target.length)];
}

/**
 * 数组扁平化处理，返回一个一维数组
 * @param {Array} target 目标数组
 * @return {Array}
 */
function flatten(target){
	var result = [], item, i = 0, l = target.length;
	while(i < l){
		item = target[i];
		if(Object.prototype.toString.call(item) === "[object Array]"){
			result = result.concat(flatten(item));
		}else{
			result.push(item);
		}
		i++;
	}
	return result;
}

/**
 * 对数组去重，返回一个没有重复元素的新数组
 * @param {Array} target 目标数组
 * @return {Array}
 */
function unique(target){
	var i, j, l = target.length, result = [];
	
	for(i = 0; i < l; i++){
		(function(){
			for(j = i + 1; j < l; j++){
				if(target[i] === target[j]){
					return;
				}
			}
			return true;
		})(i) && result.push(target[i]);					
	}
	
	return result;
}

/**
 * 对两个数组取并集，返回一个新数组
 * @param {Array} target1 目标数组1
 * @param {Array} target2 目标数组2
 * @return {Array}
 */
function union(target1, target2){
	var target = target1.concat(target2)
	var i, j, l = target.length, result = [];
	
	for(i = 0; i < l; i++){
		(function(){
			for(j = i + 1; j < l; j++){
				if(target[i] === target[j]){
					return;
				}
			}
			return true;
		})(i) && result.push(target[i]);					
	}
	return result;
}

/**
 * 对两个数组取交集，返回一个新数组
 * @param {Array} target1 目标数组1
 * @param {Array} target2 目标数组2
 * @return {Array}
 */
function intersect(target1, target2){
	var result = [], i = 0, l, repeat, compare, b = target1.length < target2.length;
	
	repeat = b ? target1 : target2;
	compare = b ? target2 : target1;
	l = repeat.length;
	
	while (i < l){
		!!~compare.indexOf(repeat[i]) && result.push(repeat[i]);
		i++;
	}
	return result;
}

/**
 * 对两个数组取差集，返回一个新数组
 * @param {Array} target1 目标数组1
 * @param {Array} target2 目标数组2
 * @return {Array}
 */
function diff(target1, target2){
	
	var result = [], i = 0, l = target1.length;
	
	while (i < l){
		!~target2.indexOf(target1[i]) && result.push(target1[i]);
		i++;
	}
	
	i = 0, l = target2.length;
	while (i < l){
		!~target1.indexOf(target2[i]) && result.push(target2[i]);
		i++;
	}
	
	return result;
}

/**
 * 过滤数组中的null，undefined，返回一个新数组
 * @param {Array} target 目标数组
 * @return {Array}
 */
function compact(target){
	var i = 0, l = target.length, result = [], item;
	
	while (i < l){
		item = target[i]; 
		item !== null && 
		typeof(item) !== "undefined" && 
		result.push(item);
		i++;
	}
	return result;
}

/**
 * 获取数组中每个元素的指定属性，返回一个新数组
 * @param {Array} target 目标数组
 * @param {String} name 属性名称
 * @return {Array}
 */
function pluck(target, name){
	var i = 0, l = target.length, result = [], item;
	
	while (i < l){
		item = target[i]; 
		if(Object.prototype.toString.call(item) === "[object Object]" && item[name]){
			result.push(item[name]);
		}
		i++;
	}
	return result;
}

/**
 * 返回数组中最小值，用于数字数组
 * @param {Object} target 目标数组
 * @return {Number}
 */
function min(target){
	return Math.min.apply(0, target);
}

/**
 * 返回数组中最大值，用于数字数组
 * @param {Object} target 目标数组
 * @return {Number}
 */
function max(target){
	return Math.max.apply(0, target);
}


/***********************************************/
/*	   		        数值				       */
/***********************************************/

/**
 * 两数相加
 * @param {Number} n1 加数1
 * @param {Number} n2 加数2
 * @return {Number}
 */
function addition(n1, n2){
	var t1, t2, m;
	try{
		t1 = n1.toString().split(".")[1].length;
	}catch(e){
		t1 = 0;
	}
	try{
		t2 = n2.toString().split(".")[1].length;
	}catch(e){
		t2 = 0;
	}
	m = Math.pow(10, Math.max(t1, t2));
	return (n1 * m + n2 * m) / m;
}

/**
 * 两数相减
 * @param {Number} n1 被减数
 * @param {Number} n2 减数
 * @return {Number}
 */
function subtraction(n1, n2){
	
	var t1, t2, m;
	try{
		t1 = n1.toString().split(".")[1].length;
	}catch(e){
		t1 = 0;
	}
	try{
		t2 = n2.toString().split(".")[1].length;
	}catch(e){
		t2 = 0;
	}
	m = Math.pow(10, Math.max(t1, t2));
	return (n1 * m - n2 * m) / m;
}

/**
 * 两数相乘
 * @param {Number} n1 被乘数
 * @param {Number} n2 乘数
 * @return {Number}
 */
function multiplication(n1, n2){
	
	var t1, t2, r1, r2;
	try{
		t1 = n1.toString().split(".")[1].length;
	}catch(e){
		t1 = 0;
	}
	try{
		t2 = n2.toString().split(".")[1].length;
	}catch(e){
		t2 = 0;
	}
	
	r1 = Number(n1.toString().replace(".", ""));
	r2 = Number(n2.toString().replace(".", ""));
	return (r1 * r2) / Math.pow(10, t1 + t2)
}

/**
 * 两数相除
 * @param {Number} n1 被除数
 * @param {Number} n2 除数
 * @return {Number}
 */
function division(n1, n2){
	
	var t1, t2, r1, r2;
	try{
		t1 = n1.toString().split(".")[1].length;
	}catch(e){
		t1 = 0;
	}
	try{
		t2 = n2.toString().split(".")[1].length;
	}catch(e){
		t2 = 0;
	}
	
	r1 = Number(n1.toString().replace(".", ""));
	r2 = Number(n2.toString().replace(".", ""));
	return (r1 / r2) * Math.pow(10, t2 - t1)
}

/**
 * 确保数值在[n1,n2]之间，如果超出，将返回最近的最小或最大数。
 * @param {Number} target 目标数值
 * @param {Number} n1 范围数值
 * @param {Number} n2 范围数值
 * @return {Number}
 */
function scope(target, n1, n2){
	var min = n1 < n2  ? n1 : n2,
		max = n1 < n2 ? n2 : n1;
	if(target < min) target = min;
	if(target > max) target = max;
	return target;
}

/**
 * 返回距离指定数值较近的数
 * @param {Number} target 目标数值
 * @param {Number} n1 范围数值
 * @param {Number} n2 范围数值
 * @return {Number}
 */
function nearer(target, n1, n2){
	var diff1 = Math.abs(target - n1),
		diff2 = Math.abs(target - n2);
		
	return diff1 <= diff2 ? n1 : n2;
}

/**
 * 保留N位小数，不足时补“0”，超出位数时四舍五入
 * @param {Number} target 目标数值
 * @param {Number} n 保留小数位数
 * @return {String}
 */
function toFixed(target, n){
	if(0.9.toFixed(0) !== '1'){
		var power = Math.pow(10, n);
		var fixed = (Math.round(target * power) / power).toString();
		if(n == 0) return fixed;
		if(fixed.indexOf(".") < 0) fixed += ".";
		var padding = n + 1 - (fixed.length - fixed.indexOf("."));
		for(var i = 0; i < padding; i++){
			fixed += "0";
		}
		return fixed;
	}else{
		return Number.prototype.toFixed.call(target, n);
	}
}

/***********************************************/
/*	   		        日期				       */
/***********************************************/

/**
 * 返回当前时间戳
 * @return {Number}
 */
function now(){
	return +new Date;
}

/**
 * n为1位时，左侧补0
 * @param {Number} n
 * @return{String}
 */
function paddingZero(n){
	var r = String(n);
	if(r.length === 1){
		return "0" + r;
	}
	return r;
}

/**
 * 获取两个日期相隔天数
 * @param {Date} date1
 * @param {Date} date2
 * @return{Number}
 */
function getDateRange(date1, date2){
	return Math.floor(Math.abs(date1 * 1 - date2 * 1) / (1000 * 60 * 60 * 24));
}

/**
 * 传入一个日期类型，返回所在月的第一天
 * @param {Date} date
 * @return{Date}
 */
function getFirstDateInMonth(date){
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * 传入一个日期类型，返回所在月的最后一天
 * @param {Date} date
 * @return{Date}
 */
function getLastDateInMonth(date){
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * 传入一个日期类型，返回所在季度的第一天
 * @param {Date} date
 * @return{Date}
 */
function getFirstDateInQuarter(date){
	return new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);
}

/**
 * 传入一个日期类型，返回所在季度的最后一天
 * @param {Date} date
 * @return{Date}
 */
function getLastDateInQuarter(date){
	return new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3 + 3, 0);
}

/**
 * 传入一个日期类型，返回是否闰年
 * @param {Date} date
 * @return{Boolean}
 */
function isLeapYear(date){
	return new Date(date.getFullYear(), 2, 0).getDate() === 29;
}

/**
 * 传入一个日期类型，返回当前月的总天数
 * @param {Date} date
 * @return{Number}
 */
function getDaysInMonth(date){
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * 日期格式化
 * @param {Date|Number} date
 * @param {String} format
 * @return{Number}
 */
var dateFormat = (function(formats) {
	function padNumber(num, digits, trim) {
		var neg = '';
		if (num < 0) {
			neg = '-';
			num = -num;
		}
		num = '' + num;
		while (num.length < digits)
		num = '0' + num;
		if (trim) num = num.substr(num.length - digits);
		return neg + num;
	}
	function dateGetter(name, size, offset, trim) {
		return function(date) {
			var value = date['get' + name]();
			if (offset > 0 || value > -offset) value += offset;
			if (value === 0 && offset === -12) {
				value = 12;
			}
			return padNumber(value, size, trim);
		};
	}
	function dateStrGetter(name, shortForm) {
		return function(date, formats) {
			var value = date['get' + name]();
			var get = (shortForm ? ('SHORT' + name) : name).toUpperCase();
			return formats[get][value];
		};
	}
	//时区
	function timeZoneGetter(date) {
		var zone = -1 * date.getTimezoneOffset();
		var paddedZone = (zone >= 0) ? "+" : "";
		paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
		return paddedZone;
	}
	//取得上午下午
	function ampmGetter(date, formats) {
		return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
	}
	var DATE_FORMATS = {
		yyyy: dateGetter('FullYear', 4),
		yy: dateGetter('FullYear', 2, 0, true),
		y: dateGetter('FullYear', 1),
		MMMM: dateStrGetter('Month'),
		MMM: dateStrGetter('Month', true),
		MM: dateGetter('Month', 2, 1),
		M: dateGetter('Month', 1, 1),
		dd: dateGetter('Date', 2),
		d: dateGetter('Date', 1),
		HH: dateGetter('Hours', 2),
		H: dateGetter('Hours', 1),
		hh: dateGetter('Hours', 2, -12),
		h: dateGetter('Hours', 1, -12),
		mm: dateGetter('Minutes', 2),
		m: dateGetter('Minutes', 1),
		ss: dateGetter('Seconds', 2),
		s: dateGetter('Seconds', 1),
		// while ISO 8601 requires fractions to be prefixed with `.` or `,` 
		// we can be just safely rely on using `sss` since we currently don't support single or two digit fractions
		sss: dateGetter('Milliseconds', 3),
		EEEE: dateStrGetter('Day'),
		EEE: dateStrGetter('Day', true),
		a: ampmGetter,
		Z: timeZoneGetter
	};
	var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/;

	return function(date, format) {
		var text = '',
			parts = [],
			fn, match;
		format = format || 'mediumDate';
		format = formats[format] || format;

		if (Object.prototype.toString.call(date) === "[object Number]") {
			date = new Date(date);
		}
		if (Object.prototype.toString.call(date) !== "[object Date]") {
			return;
		}

		while (format) {
			match = DATE_FORMATS_SPLIT.exec(format);
			if (match) {
				parts = parts.concat(match.slice(1));
				format = parts.pop();
			} else {
				parts.push(format);
				format = null;
			}
		}
		parts.forEach(function(value) {
			fn = DATE_FORMATS[value];
			text += fn ? fn(date, formats) : value.replace(/(^'|'$)/g, '').replace(/''/g, "'");
		});
		return text;
	};
})({
	"AMPMS": {
		"0": "上午",
		"1": "下午"
	},
	"DAY": {
		"0": "星期日",
		"1": "星期一",
		"2": "星期二",
		"3": "星期三",
		"4": "星期四",
		"5": "星期五",
		"6": "星期六"
	},
	"MONTH": {
		"0": "1月",
		"1": "2月",
		"2": "3月",
		"3": "4月",
		"4": "5月",
		"5": "6月",
		"6": "7月",
		"7": "8月",
		"8": "9月",
		"9": "10月",
		"10": "11月",
		"11": "12月"
	},
	"SHORTDAY": {
		"0": "周日",
		"1": "周一",
		"2": "周二",
		"3": "周三",
		"4": "周四",
		"5": "周五",
		"6": "周六"
	},
	"SHORTMONTH": {
		"0": "1月",
		"1": "2月",
		"2": "3月",
		"3": "4月",
		"4": "5月",
		"5": "6月",
		"6": "7月",
		"7": "8月",
		"8": "9月",
		"9": "10月",
		"10": "11月",
		"11": "12月"
	},
	"fullDate": "y年M月d日EEEE",
	"longDate": "y年M月d日",
	"medium": "yyyy-M-d ah:mm:ss",
	"mediumDate": "yyyy-M-d",
	"mediumTime": "ah:mm:ss",
	"short": "yy-M-d ah:mm",
	"shortDate": "yy-M-d",
	"shortTime": "ah:mm",
	"ymd":"yyyy-M-d",
	"ymdHms":"yyyy-M-d HH:mm:ss"
});

/***********************************************/
/*	   		        浏览器				       */
/***********************************************/

/**
 * 是否IE6、7、8
 * @eturn{Boolean}
 */
function isIE678(){
	return !-[1,];
	//或者
	//return !+"\v1";
	//return '\v' == 'v';
	//return /\w/.test('\u0130');
}

/**
 * 是否IE
 * @eturn{Boolean}
 */
function isIE(){
	return !!window.ActiveXObject;
}

/**
 * 是否Opera
 * @return{Boolean}
 */
function isOpera(){
	return !!window.opera;
}

/**
 * 是否Firefox
 * @return{Boolean}
 */
function isFirefox(){
	return !!window.netscape;
	//或者
	//return !!window.updateCommands;
}

/**
 * 是否Safari
 * @return{Boolean}
 */
function isSafari(){
	return !!(navigator.vendor && navigator.vendor.match(/Apple/));
}

/**
 * 是否Chrome
 * @return{Boolean}
 */
function isChrome(){
	return !!window.chrome;
}

/**
 * 是否iPhone
 * @return{Boolean}
 */
function isIPhone(){
	return /iPhone/i.test(navigator.userAgent);
}

/**
 * 是否iPad
 * @return{Boolean}
 */
function isIPad(){
	return /iPad/i.test(navigator.userAgent);
}

/**
 * 是否ios
 * @return{Boolean}
 */
function isIos(){
	return /(iPhone|iPad)/i.test(navigator.userAgent);
}

/**
 * 是否android
 * @return{Boolean}
 */
function isAndroid(){
	return /android/i.test(navigator.userAgent);
}

/**
 * jQ的获取浏览器信息方法
 * @return{Object}
 */
function getBrowserUseJQ(){
	
	function uaMatch(ua){
		ua = ua.toLowerCase();
		
		var browser_match = /(chrome)[ \/]([\w.]+)/.exec(ua) || 
					/(webkit)[ \/]([\w.]+)/.exec(ua) ||
					/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
					/(mise) ([\w.]+)/.exec(ua) ||
					ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
					[];
					
		var platform_match = /(ipad)/.exec(ua) || 
							 /(iphone)/.exec(ua) ||
							 /(android)/.exec(ua) ||
							 [];
							 
		return {
			browser : browser_match[1] || "",
			version : browser_match[2] || "",
			platform : platform_match[0] || ""
		}
	}
	
	var matched = uaMatch(window.navigator.userAgent),
		browser = {};
	
	if(matched.browser){
		browser[matched.browser] = true;
		browser.version = matched.version;
	}
	
	if(matched.platform){
		browser[matched.platform] = true;
	}
	
	//Chrome is Webkit, but Webkit is also Safari.
	if(browser.chrome){
		browser.webkit = true;
	}else if(browser.webkit){
		browser.safari = true;
	}
	
	return browser;
}

/**
 * mass的判断浏览器方法
 * @return{Object}
 */
function getBrowserUseMass(){
	var w = window,
		ver = w.opera ? 
				(opera.version().replace(/\d$/, "") - 0) :
				parseFloat((/(?:IE |fox\/|ome\/|ion\/)(\d+\.\d)/.exec(navigator.userAgent) || [,0])[1]);
	return {
		//测试是否为ie或内核为trident，是则取得其版本号
		ie: !!w.VBArray && Math.max(document.documentMode||0, ver),//内核trident
		//测试是否为firefox，是则取得其版本号
		firefox: !!w.netscape && ver,//内核Gecko
		//测试是否为opera，是则取得其版本号
		opera:  !!w.opera && ver,//内核 Presto 9.5为Kestrel 10为Carakan
		//测试是否为chrome，是则取得其版本号
		chrome: !! w.chrome &&  ver ,//内核V8
		//测试是否为safari，是则取得其版本号
		safari: /apple/i.test(navigator.vendor) && ver// 内核 WebCore
	};
}

/**
 * flash监测，返回浏览器的flash信息
 * @return{Object}
 */
function flashChecker() {
	var hasFlash = 0,
		flashVersion = 0;
	
	if (document.all) {  
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');  
		if (swf) {
			hasFlash = 1;
			flashVersion = parseInt(swf.GetVariable("$version").split(" ")[1].split(",")[0]);  
		}
	} else {
		if (navigator.plugins && navigator.plugins.length > 0) {
			var swf = navigator.plugins["Shockwave Flash"];
			if (swf) {
				hasFlash = 1;
				var words = swf.description.split(" ");
				for (var i = 0; i < words.length; ++i) {  
					if (isNaN(parseInt(words[i]))) continue;  
					flashVersion = parseInt(words[i]);
				}
			}  
		}
	}
	return {
		f: hasFlash,
		v: flashVersion
	};  
}

/**
 * 获取地址栏参数
 * @param {String} name
 * @return{String}
 */
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var match = window.location.search.substr(1).match(reg);
	return match != null ? decodeURIComponent(match[2]) : null;
}