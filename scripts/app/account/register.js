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
			code:function(val){
				if(!val && !val.length) return false;
				var flag
				$.ajax({
					url:"../JSON/validateCode.json",
					async:false,
					data:{code:val},
					success:function(data){
						flag = data.status;
					}
				});
				return flag;
			},
			confirmpwd:function(){
				return $(".ui-pass").val()==$(".ui-pass2").val();
			}
		},
		descriptions:{
			code :{
				required : '请输入短信验证码',
				conditional : '短信验证码输入错误'
			},
			pass :{
				required : '请输入密码',
			},
			pass2 :{
				required : '请输入重复密码',
				conditional : '两次密码输入不一致'
			}
		}
	})
	function sendCode(a) {
		var $this = $(this),
			reg = /^1[3|4|5|7|8]\d{9}$/;
		if ($this.hasClass("issend")) return;
		if (reg.test($(".ui-mobile").val()) == false) {
			Msg("手机号码格式不正确，请重新输入");
			return;
		} else {
			$this.addClass("issend").html("获取中…");
			$.post("../JSON/smsCode.json", {inputData: $(".ui-mobile").val()}, function(result) {
				if (result.status) {
					Msg(result.msg);
					curCount = 120;
					var t = setInterval(function() {
						if (curCount == 1) {
							window.clearInterval(t); //停止计时器
							$this.removeClass("issend").html("获取验证码");
						} else {
							curCount--;
							$this.addClass("issend").html("" + curCount + "s");
						}
					}, 1000);
				} else {
					Msg(result.msg);
					$this.removeClass("issend").html("获取验证码")
				}
			},'json');
		}
	}
	$(".ui-getCode").on('click',sendCode)
	
	var timer = !1;
	function Msg(b) {
		if (!timer) {
			var d = $('<div class="field-tooltipWrap"><div class="field-tooltipInner"><div class="field-tooltip fieldTipBounceIn"><div class="zvalid-resultformat">' + b + "</div></div></div></div>");
			d.appendTo($("body")), timer = !0, setTimeout(function() {
				d.remove(); timer = !1
			}, 1500)
		}
	}
})