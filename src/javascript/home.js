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

	  $(function(){
	   $('.fadein div:gt(0)').hide();
	    setInterval(function(){
	      $('.fadein :first-child').fadeOut()
	         .next('div').fadeIn()
	         .end().appendTo('.fadein');}, 
	      3000);
	    });	
		
});