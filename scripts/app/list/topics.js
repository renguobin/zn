define([
	'swiper',
	'../common/getCart'
],function(Swiper){
	new Swiper('.swiper-container',{
		pagination: {
			el: '.swiper-pagination',
		},
	})
	var li = document.querySelectorAll(".ui-categoryBar li"),
		width = 0;
	for (var i = 0; i < li.length; i++) {
		width += li[i].offsetWidth;
	}
	document.querySelector(".ui-categoryBar").style.width = width + "px";	
})