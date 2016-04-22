function checkIDCard(str){
	var l = str.length;
	
	if(l !== 18) return false;
	
	var a = (function str_split(str){
		var arr = [], i = 0, l = str.length;
		while(i < l){
			arr.push(str.charAt(i));
			i++;
		}
		return arr;
	})(str);
	
	var w = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
	var c = [1,0,'X',9,8,7,6,5,4,3,2];
	
	var sum = 0;
	for(var i = 0; i < 17; i++){
		sum = sum + a[i] * w[i];
	}
	var r = sum % 11;
	var res = c[r];
	
	return res == a[17];
}