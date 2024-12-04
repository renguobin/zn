define([
	'../common/getCart',
	'validateMobile'
],function(){
	$("form").mvalidate({
		type:1,
		validateInSubmit:true,
		//sendForm : false,
		valid : function(e){
			console.log()
		},
		conditional:{},
		descriptions:{
			lookup :{
				required : '请输入发票抬头'
			},
			nsrNumber :{
				required : '请输入纳税人识别号',
			},
		}
	})
	$(".ui-invoiceType").on('click',function(){
		var _this =　$(this),
			value = _this.val();
			_this.parent().addClass('on').siblings().removeClass('on')
		if (value=='1') {
			$(".VAT").addClass("hidden")
		} else {
			$(".VAT").removeClass("hidden")
		}
	})
	$(".ui-deleteInvoice").on('click',function(){
		$.getJSON("../JSON/formSubmit.json",{key : id},function(e){
			console.log(e)
		})
	})
})