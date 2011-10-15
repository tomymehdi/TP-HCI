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
			
	    } , function() {
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

	$('#facebook').click( function() {
		window.location = "http://www.facebook.com";
	});

	$('#twitter').click( function() {
		window.location = "http://www.twitter.com";
	});

	$('#contactUs').click( function() {
        $("#main").load("./html/contact.html #main > *");
	});

	$('#whereAreWe').click( function() {
        $("#main").load("./html/map.html #main");
	});

	$('#register_link').click( function(){
		$("#main").load("./html/register.html #main > *");
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


function initMenu(name) {
	

	
  loadMenu();
 
  
	
  var id= '#'+name+'_sm';
	
  $('#menu ul').hide();
  $(id).show();

  $('#menu li a').click(
    function() {
      var checkElement = $(this).next();
      if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        return false;
        }
      if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
        $('#menu ul:visible').slideUp('normal');
        checkElement.slideDown('normal');
        return false;
        }
      }
    );
 }



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
function reloadhomeFunc(){
	if(document.getElementById("homeFuncScript")){
		$("#homeFuncScript").remove();
	}
	
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/homefunc.js";
	ss.id = "homeFuncScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
}

function reloadjsScript(){
	if(document.getElementById("jsScript")){
		$("#jsScript").remove();
	}
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/js.js";
	ss.id = "jsScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
	
}
function reloadServiceScript(){

	if(document.getElementById("ServiceScript")){
		$("#ServiceScript").remove();
	}
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/services.js";
	ss.id = "servicesScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
	
}
function reloadArticlesScript(name){
	
    if(document.getElementById("articlesScript")){
		$("#articlesScript").remove();
	}
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/articles.js";
	ss.id = "articlesScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
	
	initMenu(name);
	
}

function reloadItemsManagerScript(){
	if(document.getElementById("itemsManagerScript")){
		$("#itemsManagerScript").remove();
	}
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/itemsManager.js";
	ss.id = "itemsManagerScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
}

function reloadregisterScript(){
	if(document.getElementById("registerScript")){
		$("#registerScript").remove();
	}
	
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/register.js";
	ss.id = "registerScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
}
   