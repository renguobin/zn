define([
	'../common/getCart'
],function(){
var storage = {
		get : function (name) {
			return JSON.parse(localStorage.getItem(name))
		},
		set : function (name, val) {
			localStorage.setItem(name, JSON.stringify(val))
		},
		remove : function(name){
			localStorage.removeItem(name)
		}
	},
	timer;
var $search = {
		getData : function(){
			$.ajax({
				url : "JSON/search.json",

			})
		},
		timerGet : function(){
			var _this = $(this)
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout($search.searchAlways,500,_this)
		},
		searchAlways : function(a){
			var box = $(".search-timer"),
				$key = a.val()
			if ($key) {
				$.getJSON("JSON/search.json",{key : $key},function(e){
					var D = e.data,
						M = [];
					for (var i = 0; i < D.length; i++) {
						var str = '<li><a class="ui-searchLink" data-value=\'{"id":"'+D[i].id+'","name":"'+D[i].name+'"}\'>'+D[i].name+'</a></li>'
						M.push(str)
					}
					box.removeClass("hidden").empty().append(M.join(''))
					$(".ui-searchLink").on("click",$search.searchLink)
				})
			} else {
				box.addClass("hidden")
			}
		},
		searchLink : function(){
			var _this = $(this);
				_data = _this.data("value");
				$search.updateHistory(_data)
		},
		updateHistory : function(D){
			var history = storage.get('searchHistory') || {};
			history[D.id] = D;
			storage.set('searchHistory',history);
			location.href='?id='+D.id
		},
		getHistory : function(){
			var history = storage.get('searchHistory');
			var str = ""
			for (var i in history) {
				str += "<a href=\"?id="+i+"\">"+history[i].name+"</a>"
			}
			$(".ui-searchHistory").empty().append(str)
		},
		clearHistory : function(){
			storage.remove('searchHistory');
			$(".ui-searchHistory").empty()
		}
	};
	$(".ui-searchKey").on("keyup",$search.timerGet)
	$(".ui-clearHistory").on("click",$search.clearHistory)
	$search.getHistory()
})