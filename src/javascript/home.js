$(document).ready( function() {	
	
	var opacity = 1, toOpacity = 0.5, duration = 2500;
	
	$('.main_opt').css('opacity',opacity).hover(function() {
	      $(this).animate({
				opacity: toOpacity,
			}, 400 );
	    }, function() {
	      $(this).animate({
				opacity: opacity,
			}, 100 );
	    }
	);
	

	  $(function(){
	   $('.fadein div:gt(0)').hide();
	    setInterval(function(){
	      $('.fadein :first-child').fadeOut()
	         .next('div').fadeIn()
	         .end().appendTo('.fadein');}, 
	      3000);
	    });	
	  
	  
	  
     $('.cds_link').click(function(){
          $("#main").load("./movies.html #main");
      });
		     $('.books_link').click(function(){
		           $("#main").load("./movies.html #main");
		     });

		     $('.movies_link').click(function(){
		           $("#main").load("./movies.html #main");
		       $('#subnavegador').hide();    
		     });  
		
});