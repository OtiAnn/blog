//= require_tree .
$().ready(function(){

	var navbarYOffset = $('#navbar').offset().top;
	$(window).scroll(function(){
	  if(window.scrollY > navbarYOffset){
	  	$('header').addClass('fixed-on-top');
	  	$('.navbar-480').addClass('re-position-for-navbar-480')
	  	$('.container').addClass('re-position-for-navbar')
	  	$('footer').addClass('re-position-for-content')
	  }else{
	  	$('header').removeClass('fixed-on-top');
	  	$('.navbar-480').removeClass('re-position-for-navbar-480')
	    $('.container').removeClass('re-position-for-navbar')
	  	$('footer').removeClass('re-position-for-content')
	  }
	});
	
	$('.navbar-480').click(function(){
		$(this).toggleClass('open');
	});
})