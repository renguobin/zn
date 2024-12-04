define([
	'../common/getCart'
],function(){
	var $product = {
		selectPropert : function(){
			var _this = $(this),
				_data = _this.data("value").split('|');
				_this.addClass('on').siblings().removeClass('on')
			$propert[_data[0]] = _data[1];
		},
		numberPlugin : function(){
			var _this = $(this),
				input = _this.siblings("input"),
				value = parseInt(input.val());
			if (_this.hasClass("disabled")) {
				return;
			};
			if (_this.hasClass("minus")) {
				value--;
				if (value<=1) {
					_this.addClass("disabled")
				}
			} else {
				value++;
				_this.siblings(".minus").removeClass("disabled")
			}
			$propert.number = value;
			input.val(value)
		},
		joinCart : function(){
			$.post("JSON/joinCart.json",$propert,function(e){
				if (e.status) {
					alert("已成功加入购物车");
					$(".ui-cartNumber").text(e.data)
				}
			},"json")
		}
	}
	$(".ui-selectPropert,.ui-backProduct").on("click",function(){
		$("body").toggleClass("modal-open")
	})
	$(".propert-item li").on("click",$product.selectPropert)
	$(".ui-numberPlugin i").on("click",$product.numberPlugin)
	$(".ui-joinCart").on("click",$product.joinCart)
})