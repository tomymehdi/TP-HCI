$(document).ready( function() {	
	
	$('.main_opt').mouseover( function(){
			$(this).animate({
	    	opacity: 0.5,
	 		 }, 400 );			
		});

	
	$('.main_opt').mouseout( function(){
			$(this).animate({
	    	opacity: 1,
	 		 }, 100 );			
		});
		
		
	

	  $(function(){
	   $('.fadein div:gt(0)').hide();
	    setInterval(function(){
	      $('.fadein :first-child').fadeOut()
	         .next('div').fadeIn()
	         .end().appendTo('.fadein');}, 
	      3000);
	    });	
		
});