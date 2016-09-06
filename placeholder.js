$(function(){
    //判断浏览器是否支持placeholder属性
    var supportPlaceholder = 'placeholder'in document.createElement('input'),
    placeholderText = function(input){

        var text = input.attr('placeholder'),
        	defaultValue = input.val();
        
        !defaultValue && input.val(text).addClass("phcolor");

        input.focus(function(){
        	input.val() == text && $(this).val(""); 
        });
 
        input.blur(function(){
        	input.val() == "" && $(this).val(text).addClass("phcolor");
        });

        //输入的字符不为灰色
        input.keydown(function(){
            $(this).removeClass("phcolor");
        });
    },
    placeholderPwd = function(input){
    	
        var text = input.attr('placeholder'),
        	defaultValue = input.val();
        
        input.hide().after('<input id="pwdPlaceholder" type="text" value=' + text + ' autocomplete="off" class="phcolor"/>');
		var pwdPlaceholder = $('#pwdPlaceholder');
    	
        if(defaultValue){
        	pwdPlaceholder.hide();
        	input.show();
        }

        pwdPlaceholder.focus(function(){
        	pwdPlaceholder.hide();
        	input.show().focus();
        });
 
        input.blur(function(){
            if(input.val() == ""){
        		input.hide();	
                pwdPlaceholder.show();
            }
        });
    };

    //当浏览器不支持placeholder属性时，调用placeholder函数
    if(!supportPlaceholder){
        $('input[type="text"]').each(function(){
        	placeholderText($(this));
        });
        $('input[type="password"]').each(function(){
        	placeholderPwd($(this));
        });
    }
});