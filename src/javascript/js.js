$(document).ready( function() {
	
		
	$('#login_data').hide();

	
	$('#CartContainer').click( function(){
        $("#main").load("./cart.html #main");
	});
	
	
	var opacity = 1, toOpacity = 0.5, duration = 2500;
	 $('#CartContainer').css('opacity',opacity).hover(function() {
	      $(this).animate({
				opacity: toOpacity,
			}, 400 );
	    }, function() {
	      $(this).animate({
				opacity: opacity,
			}, 100 );
	    }
	  );
	  
	
	$('#WishListContainer').click( function(){
        $("#main").load("./wishlist.html #main");
	});
	
	 $('#WishListContainer').css('opacity',opacity).hover(function() {
	      $(this).animate({
				opacity: toOpacity,
			}, 400 );
	    }, function() {
	      $(this).animate({
				opacity: opacity,
			}, 100 );
	    }
	  );
	
	
	$('#login_opt').click( function(){
		$(this).animate({
			opacity: 1,
		}, 400 );	
		if($('#login_data').is(":hidden")){
			$('#login_data').slideDown();
		} else{
			$('#login_data').slideUp();
		}
	});
	$('#login_opt').click( function(){
	});
	
	$('#login_button').click( function(){
		$('#login_data').slideUp();
	});
	
	
	$('.item').css('opacity',opacity).hover(function() {
	      $(this).animate({
				opacity: toOpacity,
			}, 400 );
	    }, function() {
	      $(this).animate({
				opacity: opacity,
			}, 100 );
	    }
	);
	
	
	
    $('.home').click( function(){
        
    	$("#main").load("./home.html #main");

        var ss = document.createElement('script');
        ss.type = 'text/javascript';
        ss.src = "../javascript/home.js";
        var hh = document.getElementsByTagName('head')[0];
        hh.appendChild(ss);
        
        
        
        var ss = document.createElement('script');
        ss.type = 'text/javascript';
        ss.src = "../javascript/js.js";
        var hh = document.getElementsByTagName('head')[0];
        hh.appendChild(ss);
	});
    
    
		
	$('.footerItem').mouseover( function(){
		$(this).animate({
    	opacity: 0.5,
 		 }, 400 );			
	});
	
	$('.footerItem').mouseout( function(){
		$(this).animate({
    	opacity: 1,
 		 }, 100 );			
	});
	
	$('#logo').mouseover( function(){
		$(this).animate({
    	opacity: 0.5,
 		 }, 400 );			
	});
	
	$('#logo').mouseout( function(){
		$(this).animate({
    	opacity: 1,
 		 }, 100 );			
	});

	$('#facebook').click( function() {
		window.location = "http://www.facebook.com";
	});
	
	$('#twitter').click( function() {
		window.location = "http://www.twitter.com";
	});
	
	$('#contactUs').click( function() {
        $("#main").load("./contact.html #main");
	});
	
	$('#whereAreWe').click( function() {
        $("#main").load("./map.html #main");// hacer la huevada de googlemaps
	});

	
	$('#register_link').click( function(){
		
		$("#main").load("./register.html #main");
		
		var ss = document.createElement('script');
		ss.type = 'text/javascript';
		ss.src = "../javascript/register.js";
		var hh = document.getElementsByTagName('head')[0];
		hh.appendChild(ss);
		
		
		var ss = document.createElement('script');
		ss.type = 'text/javascript';
		ss.src = "../javascript/js.js";
		var hh = document.getElementsByTagName('head')[0];
		hh.appendChild(ss);
	});
		
	

	
	
});

