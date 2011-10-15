$(document).ready( function() {	
	
	
	var opacity = 1;
	var toOpacity = 0.5;
	var duration = 2500;
	
	currentCoinType = dollars;
	
	//setTimeout("actualizeCart()", 100);
	//setTimeout("actualizeWishlist()", 100);
	
    $("#main").load("./html/home.html #main > *");   

   	setTimeout("appendCats()",500);
	
	setTimeout("reloadhomeFunc()",2000);
	

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
			reloadArticlesScript(CategoriesList.categories[0].name);
			reloadItemsManagerScript();
			reloadjsScript();			
			setTimeout("loadItems((CategoriesList.categories[0], 1)", 100);
		});

		$('.DVD_link').click(function(){
			$("#main").load("./html/articles.html #main > *");
			reloadArticlesScript(CategoriesList.categories[1].name);
			reloadItemsManagerScript();
			reloadjsScript();			
			setTimeout("loadItems(CategoriesList.categories[1], 1)", 100);
			
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

	
 });


function appendCats(){    

	var j=0;
	var cate;

	if(document.getElementById("main_opt")){
	}
	else{
		
		$('#FooterCat').empty(); 
		
		while(j < CategoriesList.categories.length){
			cate = CategoriesList.categories[j];
		    $('#main').append('<div id="main_opt"><div  class="'+cate.name+'_link  title" >'+cate.name+'</div>');
		    $('#FooterCat').append('<li><a  class="'+cate.name+'_link pointer">'+cate.name+'</a></li>');
			j++;

			}
	
	} 
}

