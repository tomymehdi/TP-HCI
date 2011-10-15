$(document).ready( function() {
	$('#CartContainer').click( function(){
        $("#main").load("./html/cart.html #main > *");
	});

	$('#Cart2 a').click( function(){
        $("#main").load("./html/cart.html #main > *");
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
        $("#main").load("./html/wishlist.html #main > *");
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
	        $("#main").load("./html/wishlist.html #main > *");
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
		
		 /*Decaparece la opcion de login y pasa a ser MyAccount, faltaira validar el usuario si es necesario */
       
		
		$('#register_link').replaceWith('<div id="MyAccount_opt" class="item"><div id="text_MyAccount" class="text">MyAcc</div><div id="MyAccount"></div></div>');
        
        $('#login_opt').replaceWith('<div id="Logout_opt" class="item"><div id="text_Logout" class="text">Logout</div><div id="logout"></div></div>');
		
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
    
        $("#main").load("./html/home.html #main > *");
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
$('#logout').live('click',function(){
     
        $('#MyAccount_opt').replaceWith('<div class="item" id="register_link"><div class="text">Register</div><div id="register"></div></div>');
        
        $('#Logout_opt').replaceWith('<div id="login_opt" class="item"><div id="text_login" class="text">Login</div><div id="login"></div></div>');
    
});

$('#facebook').live('click',function(){
	window.location = "http://www.facebook.com";
});

$('#twitter').live('click',function(){
	window.location = "http://www.twitter.com";
});

$('#contactUs').live('click',function(){
    $("#main").load("./html/contact.html #main");
});

$('#whereAreWe').live('click',function(){
        $("#main").load("./html/map.html #main");
});

$('#register_link').live('click',function(){
	$("#main").load("./html/register.html #main");
	reloadregisterScript();
});
    
$('#MyAccount_opt').live('click',function(){
	$("#main").load("./html/myaccount.html #main");
});
});


//termina el documentready aca


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




   