$(document).ready( function() {
	$('#CartContainer').click( function(){
        $("#main").load("./html/cart.html #main");
	});

	$('#Cart2 a').click( function(){
        $("#main").load("./html/cart.html #main");
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
        $("#main").load("./html/wishlist.html #main");
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

	 $('#WishList2 a').click( function(){
	        $("#main").load("./html/wishlist.html #main");
		});

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
        $("#main").load("./index.html #main");
        reloadhomeScript();
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
        $("#main").load("./html/contact.html #main");
	});

	$('#whereAreWe').click( function() {
        $("#main").load("./html/map.html #main");
	});

	$('#register_link').click( function(){
		$("#main").load("./html/register.html #main");
		reloadregisterScript();
	});
	
	$('#prev').click(function(){
		if(currentPage != 1){
			$('#pageNumber').remove();
			$('#Items').empty();
			setTimeout("loadItems(currentCategory, parseInt(currentPage - 1))", 100);
		}
	});

	$('#next').click(function(){
		if(currentPage != getMaxPage()){
			$('#pageNumber').remove();
			$('#Items').empty();
			setTimeout("loadItems(currentCategory, parseInt(currentPage + 1))", 100);
		}
	});
});

function reloadhomeScript(){
	if(document.getElementById("homeScript")){
		$("#homeScript").remove();
	}
	
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/home.js";
	ss.id = "homeScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
}


