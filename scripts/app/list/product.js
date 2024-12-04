define([
	'../common/getCart'
],function(){
	var li = document.querySelectorAll(".ui-categoryBar li"),
		width = 0;
		for (var i = 0; i < li.length; i++) {
			width += li[i].offsetWidth;
		}
		document.querySelector(".ui-categoryBar").style.width = width + "px";
	var filter = {},
		timer0,
		page = 1,
		flag = !0;
	var product = {
		sort : function(){
			var _this = $(this);
			_this.toggleClass("on");
			if (_this.hasClass("filter")) {
				product.filterOpen()
			} else {
				product.sortAction(_this)
			}
		},
		sortAction : function(D){
			var sort = D.data("value");
			filter[sort] = D.hasClass('on')
			product.render(product.getData())
		},
		filterOpen : function(){
			$("body").addClass('filter-on')
			$('.product-filter').addClass('open')
		},
		filterClose : function(){
			$("body").removeClass('filter-on')
			$('.product-filter').removeClass('open')
			$(".product-sort a.filter").removeClass("on")
		},
		moreFilter : function(){
			var _this = $(this);
			filter = _this.parents(".filter-item").find(".filter-body");
			filter.toggleClass("all")
			filter.hasClass("all") ? _this.addClass('all') : _this.removeClass('all')
		},
		allFilter : function(){
			$(".product-filter").toggleClass('open')
			$('body').removeClass("filter-on")
			$(".product-sort a.filter").removeClass("on")
		},
		selectFilter : function(){
			var _this = $(this),
				option = _this.parents("ul").find('a'),
				_key = _this.data('value').split('|')[0];
				_this.toggleClass("on");
			var D = [];
			$.each(option,function(i,v){
				var _v = $(v),
					_d = _v.data('value').split('|');
				if (_v.hasClass('on')) {
					D.push(_d[1])
				}
			})
			filter[_key] = D.join(',');
		},
		filterReset : function(){
			$('.ui-filter a').removeClass('on');
			filter = {};
			page = 1;
			flag = !0
		},
		filterSubmit : function(){
			page = 1;
			flag = !0;
			product.render(product.getData(page))
			product.filterClose()
		},
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
		searchTag : function(){
			$(this).parents(".search-tag").remove()
		}
	};
		
	$(window).on('scroll',product.timerScroll)
	$(".product-sort a").on("click",product.sort)
	$(".filter-category .more").on("click",product.moreFilter)
	$(".product-filter .mask").on('click',product.filterClose)
	$(".ui-filter a").on('click',product.selectFilter)
	$(".ui-filterReset").on('click',product.filterReset)
	$(".ui-filterSubmit").on('click',product.filterSubmit)
	$(".search-tag i").on('click',product.searchTag)
})