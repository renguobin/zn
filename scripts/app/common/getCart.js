define(['zepto'],function(zepto){
	$.getJSON('JSON/cartNumber.json',{id:1},function(e){
		$(".ui-cartNumber").text(e.data)
	})
})