$(document).ready( function() {
	

	$('#CartContainer').click( function(){
        $("#main").load("./html/cart.html #main > *");
		reloadCartScript();
		reloadItemsManagerScript();
	});
	
	$('#WishListContainer').click( function(){
        $("#main").load("./html/wishlist.html #main > *");
        reloadWishlistScript();
        reloadItemsManagerScript();
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

	 

	$('#login_opt').live('click', function(){
		$(this).animate({
			opacity: 1,
		}, 400 );	
		if($('#login_data').is(":hidden")){
			$('#login_data').slideDown();
		} else{
			$('#login_data').slideUp();
		}
	});

	$('#login_button').live('click', function(){
	$('#login_data').slideUp();
	
	/*Decaparece la opcion de login y pasa a ser MyAccount, faltaira validar el usuario si es necesario */
       
		$('#register_link').replaceWith('<div id="MyAccount_opt" class="item"><div id="text_MyAccount" class="text">MyAcc</div><div id="MyAccount"></div></div>');
        
        $('#login_opt').replaceWith('<div id="Logout_opt" class="item"><div id="text_Logout" class="text">Logout</div><div id="logout"></div></div>');
	
	if(!($('#login_data2').is("hidden"))){
		$('#login_data2').slideUp();
	}
});
	
	$('#Logout_opt').live('click',function(){
     
        $('#MyAccount_opt').replaceWith('<div class="item" id="register_link"><div class="text">Register</div><div id="register"></div></div>');
        
        $('#Logout_opt').replaceWith('<div id="login_opt" class="item"><div id="text_login" class="text">Login</div><div id="login"></div></div>');
    
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

//	$('#whereAreWe').click( function() {
//        $("#main").load("./html/whereAreWe.html #main");
//	});

	$('#register_link').live('click', function(){
		$("#main").load("./html/register.html #main > *");
		reloadregisterScript();
	});
	
	$('#MyAccount_opt').live('click', function(){
		$("#main").load("./html/myaccount.html #main > *");
		reloadmyaccountScript();
	});
});

function initializeMap() {
	$('#main').empty();
  	var latlng = new google.maps.LatLng(-34.602929, -58.367862);
  	var myOptions = {
    zoom: 18,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	navigationControl: true,
	mapTypeControl: true,
	scaleControl: true
  	};
  	var map = new google.maps.Map(document.getElementById("main"), myOptions);
	var contentString = '<div id="content">'+
	'<div id="siteNotice">'+
	'</div>'+
	'<h1 id="firstHeading" class="firstHeading">ART</h1>'+
	'<div id="bodyContent">'+
	'<p><b>ART</b> staff is integrated by 3 students from ITBA (Technology Institute of Buenos Aires). Their names are '+
	'(by alphabetical order): Alan Pierri - Luciana Reznik - Tomás Mehdi. They are all from Buenos Aires, Argentina, and ' + 
	'by means of this work they are on their search for HCI approval. Please give us feedback at fakemail@alu.itba.edu.ar</p>' + 
	'<p>Address: Eduardo Madero 399, <a href="http://www.itba.edu.ar">'+
	'ITBA</a></p>'+
	'</div>'+
	'</div>';
	
	var infowindow = new google.maps.InfoWindow({
	content: contentString
	});
	var marker = new google.maps.Marker({
	position: latlng,
	map: map,
	title: "ART"
	});
	google.maps.event.addListener(marker, 'click', function() {
	infowindow.open(map,marker);
	});
	infowindow.open(map,marker);
}

function initMenu(n) {


 setTimeout("loadMenu()", 500);
  
 
 setTimeout("setStart()",500);

	
}

function setStart(){
	

	$('#menu ul').hide();

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
	});

if(currentCategory.name=="DVD"){
	$('#menu ul:first').show();
}
else{
	$('#menu ul:last').show();
}


}

function loadMenu(){
	
	$('#menu').empty();
	
	var w=0;
	var e=0;

	while(w <  CategoriesList.categories.length){

		var id='#'+CategoriesList.categories[w].name+'_sm';	
		
			$('#menu').append('<li><a class="'+ CategoriesList.categories[w].name  +'_link" href="#">'+CategoriesList.categories[w].name+'</a><ul id="'+CategoriesList.categories[w].name+'_sm"></ul></li>');

	while(e <  CategoriesList.categories[w].subcategories.length){	
		
	var id='#'+CategoriesList.categories[w].name+'_sm';	
	$(id).append('<li><a class="subitem" id="'+ CategoriesList.categories[w].subcategories[e].name +'" href="#" >'+CategoriesList.categories[w].subcategories[e].name+'</a></li>');
	e++;
	
	}
	e=0;
	
	w++;
	}
	
	reloadhomeFunc();
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

function reloadArticlesScript(n){
	
	
    if(document.getElementById("articlesScript")){
		$("#articlesScript").remove();
	}
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/articles.js";
	ss.id = "articlesScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
	
	initMenu(n);
	
	
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

function reloadmyaccountScript(){
	if(document.getElementById("myaccountScript")){
		$("#myaccountScript").remove();
	}
	
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/myaccount.js";
	ss.id = "myaccountScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
}

function reloadMenuScript(){
	
	if(document.getElementById("MenuScript")){
		$("#MenuScript").remove();
	}
	
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/menu.js";
	ss.id = "MenuScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
}
function reloadCartScript(){
	
	if(document.getElementById("CartScript")){
		$("#CartScript").remove();
	}
	
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/cart.js";
	ss.id = "CartScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
}

function reloadWishlistScript(){
	
	if(document.getElementById("WishlistScript")){
		$("#WishlistScript").remove();
	}
	
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/wishlist.js";
	ss.id = "WishlistScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
}
