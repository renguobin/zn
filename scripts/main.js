require.config({
	baseUrl: "http://localhost/znMobile/scripts/",
	skipDataMain: true,
	paths: {
		'zepto' : 'libs/zepto/zepto.min',
		'jquery' : 'libs/jquery/jquery-3.2.1.min',
		'swiper' : 'plugins/swiper/swiper.min',
		'template' : 'plugins/template/template-web',
		'validate' : 'plugins/validate/jquery.validate.min',
		'validateMobile' : 'plugins/validateM/zepto-mvalidate'
	},
	shim: {
		//'slide' : {deps: ['jquery'], exports: "$.fn.slide"}
	},
	//waitSeconds : 60,
	//urlArgs: "t=" + (new Date()).getTime(),
});