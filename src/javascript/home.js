$(document).ready( function() {	
	
    $("#main").load("./html/home.html #main > *");   

   //SI pongo este aparece pero no llega a tener el link….. setTimeout("appendCats()",10);

    appendCats();

        
	currentCoinType = dollars;
	setTimeout("actualizeCart()", 100);
	setTimeout("actualizeWishlist()", 100);
    
    

    
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
    
    $(document).ready( function() {	


        //HACERLO GENERICO!!!!//
        
		$('.Books_link').click(function(){
			$("#main").load("./html/articles.html #main > *");
			reloadArticlesScript();
			reloadItemsManagerScript();
			reloadjsScript();
			setTimeout("loadItems(CategoriesList.categories[1], 1)", 100);
		});

		$('.DVD_link').click(function(){
			$("#main").load("./html/articles.html #main > *");
			reloadArticlesScript();
			reloadItemsManagerScript();
			reloadjsScript();
			
			setTimeout("loadItems(CategoriesList.categories[0], 1)", 100);
		});
		
		
        $('#pesos').click(function(){
			var previousCoinType = currentCoinType;
			currentCoinType = pesos;
			actualizeCart();
			$('*').filter('#PriceTag').text(currentCoinType.toString());
			$('*').filter('#PriceNumber').replaceWith(function(){
				return ('<div id="PriceNumber" >' + roundNumber(parseFloat((parseFloat($(this).text())/previousCoinType.value)*currentCoinType.value), 2)+ '</div>');
			});
		});
		
		$('#euros').click(function(){
			var previousCoinType = currentCoinType;
			currentCoinType = euros; 
			actualizeCart();
			$('*').filter('#PriceTag').text(currentCoinType.toString());
			$('*').filter('#PriceNumber').replaceWith(function(){
				return ('<div id="PriceNumber" >' + roundNumber(parseFloat((parseFloat($(this).text())/previousCoinType.value)*currentCoinType.value), 2)+ '</div>');
			});
		});
		
		$('#dollars').click(function(){
			var previousCoinType = currentCoinType;
			currentCoinType = dollars; 
			actualizeCart();
			$('*').filter('#PriceTag').text(currentCoinType.toString());
			$('*').filter('#PriceNumber').replaceWith(function(){
				return ('<div id="PriceNumber" >' + roundNumber(parseFloat((parseFloat($(this).text())/previousCoinType.value)*currentCoinType.value), 2)+ '</div>');
			});
		});
		

});

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

function reloadArticlesScript(){
	
    if(document.getElementById("articlesScript")){
		$("#articlesScript").remove();
	}
	var ss = document.createElement('script');
	ss.type = 'text/javascript';
	ss.src = "./javascript/articles.js";
	ss.id = "articlesScript";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
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
});
