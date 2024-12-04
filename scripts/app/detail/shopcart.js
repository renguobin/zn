define([
	'../common/getCart'
],function(){
	var $shopcart = {
		select : function(){
			$(this).parents(".product-item").toggleClass("on")
			$shopcart.compute()
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
			input.val(value)
			$shopcart.compute()
		},
		compute : function(){
			var total = 0,
				size = 0;
			$.each($('.product-item.on'),function(i,v){
				var t = $(v),
					d = t.find(".ui-numberInput"),
					p = parseInt(d.val()),
					n = parseFloat(d.data('price'));
				total += p*n
				size++
			})
			$(".ui-selectNumber").text(size);
			$(".ui-totalPrice").text(total)
		}
	}
	$(".ui-numberPlugin i").on("click",$shopcart.numberPlugin)
	$(".product-item .select input").on("click",$shopcart.select)
})