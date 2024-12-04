define([
	'../common/getCart'
],function(){
	var filter = {},
		timer0,
		page = 1,
		flag = !0;
	var product = {
		getData : function(p){
			var dom = [];
			$.ajax({
				url : 'JSON/product.json',
				type : 'post',
				data : $.extend(filter,{page:p}),
				async : false,
				success : function(r){
					if (r.page == page) {
						flag = false;
					}
					if (r.status && r.data.length>0) {
						var d = r.data;
						for (var i = 0; i < d.length; i++) {
							var str  = '<li><a href="?id='+d[i].id+'">';
								str += '<div class="pic"><img src="'+d[i].pic+'" alt=""></div>';
								str += '<div class="name">'+d[i].name+'</div>';
								str += '<div class="tips">'+d[i].tips+'</div>';
								str += '<div class="price">￥'+d[i].price+'</div>';
								str += '</a></li>';
							dom.push(str)
						}
					}
				}
			})
			return dom;
		},
		render : function(D){
			$(".product-item ul").append(D.join(''))
		},
		timerScroll : function(){
			if (timer0) {
				clearTimeout(timer0)
			}
			timer0 = setTimeout(product.getScroll,500)
		},
		getScroll : function(){
			if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
				if (flag) {
					var D = product.getData(page++);
					product.render(D)
				} else {
					$('.load-more span').addClass('no-data').text('没有更多了')
				}
			}
		},
	};
		
	$(window).on('scroll',product.timerScroll)
})