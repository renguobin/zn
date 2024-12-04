define([
	'../common/getCart',
	'validateMobile'
],function(){
	$.mvalidateExtend({
		email:{
			//required : true,
			pattern : /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
			descriptions:{
				//required : '请输入邮箱',
				pattern : '请您输入正确的邮箱格式'
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