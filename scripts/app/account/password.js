define(['validateMobile'],function(mobileValidate){
	$.mvalidateExtend({
		phone:{
			required : true,
			pattern : /^1[3|4|5|7|8]\d{9}$/,
			descriptions:{
				required : '请输入手机号',
				pattern : '请您输入正确的手机格式'
			}
		}
	});
	$("form").mvalidate({
		type:1,
		validateInSubmit:true,
		//sendForm : false,
		valid : function(e){
			console.log()
		},
		conditional:{
			confirmpwd:function(){
				return $(".ui-pass").val()==$(".ui-pass2").val();
			}
		},
		descriptions:{
			oldPass : {
				required : '请输入旧密码',
			},
			pass :{
				required : '请输入新密码',
			},
			pass2 :{
				required : '请输入重复密码',
				conditional : '两次密码输入不一致'
			}
		}
	})
})