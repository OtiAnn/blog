$(document).on('ready page:load', function(){

	var navbarYOffset = $('#navbar').offset().top;

	$(window).scroll(function(){
	  if(window.scrollY > navbarYOffset){
	  	$('header').addClass('fixed-on-top');
	  	$('.container').addClass('re-position-for-navbar')
	  	$('footer').addClass('re-position-for-content')
	  }else{
	  	$('header').removeClass('fixed-on-top');
	    $('.container').removeClass('re-position-for-navbar')
	  	$('footer').removeClass('re-position-for-content')
	  }
	});
	
	$('.navbar-480').click(function(){
		$(this).toggleClass('open');
	});

});