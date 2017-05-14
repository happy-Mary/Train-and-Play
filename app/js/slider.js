$(document).ready(function(){
	$( ".slider-item" ).hover(
	  function() {
	    $(this).find('.slider-img').fadeTo(5, 0.3);
	    $(this).find('.btn-circle').fadeTo(5, 1);
	    $(this).find('.slider-text').addClass('active-text');
	  }, 
	  function() {
	    $(this).find('.slider-img').fadeTo(5, 1);
	    $(this).find('.btn-circle').fadeTo(5, 0);
	    $(this).find('.slider-text').removeClass('active-text');
	  }
	);
});








