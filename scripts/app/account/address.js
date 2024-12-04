define([
	'../common/getCart',
	'validateMobile'
],function(){
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
		conditional:{},
		descriptions:{
			SJR :{
				required : '请输入收件人'
			},
			sjAddress :{
				required : '请输入收件地址',
			},
		}
	})
	$(".ui-deleteAddress").on('click',function(){
		$.getJSON("../JSON/formSubmit.json",{key : id},function(e){
			console.log(e)
		})
	})
})