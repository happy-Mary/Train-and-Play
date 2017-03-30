$(document).ready(function(){
	console.log("okok");
	$( ".slider-item" ).hover(
	  function() {
	    $(this).find('.slider-img').fadeTo(5, 0.3);
	    $(this).find('.btn-circle').fadeTo(5, 1);
	  }, 
	  function() {
	    $(this).find('.slider-img').fadeTo(5, 1);
	    $(this).find('.btn-circle').fadeTo(5, 0);
	  }
	);
});





// $('.slider-item').hover(function(){
// 	$('.slider-img').fadeTo(50, 0.2);
// 	$('.btn-circle').fadeTo(50, 1);
// });





