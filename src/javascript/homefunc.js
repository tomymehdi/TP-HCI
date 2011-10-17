
	$('.subitem').click(function(){


			var id=$(this).attr('id');
			var cs=null;


			cs=searchSC(id);	
			CurrentSubCategory=cs;	

			$("#main").load("./html/articles.html #main > *");

			loadItems(cs, 1);
			currentCategory=cs.category;
			reloadMenu(0);
			setTimeout('addNavigation("'+currentCategory.name+'", 1)',200);
			setTimeout('addNavigation("'+cs.name+'", 2)',400);
		});
	
    $('#pesos').click(function(){
		var previousCoinType = currentCoinType;
		currentCoinType = pesos;
		actualizeCart();
		actualizeTotal();
		actualizeCount();
		$('*').filter('#PriceTag').text( '' + currentCoinType);
		$('*').filter('#PriceNumber').replaceWith(function(){
			return ('<div id="PriceNumber" >' + roundNumber(parseFloat((parseFloat($(this).text())/previousCoinType.value)*currentCoinType.value), 2)+ '</div>');
		});
	});
	
	$('#euros').click(function(){
		var previousCoinType = currentCoinType;
		currentCoinType = euros; 
		actualizeCart();
		actualizeTotal();
		actualizeCount();
		$('*').filter('#PriceTag').text(currentCoinType.toString());
		$('*').filter('#PriceNumber').replaceWith(function(){
			return ('<div id="PriceNumber" >' + roundNumber(parseFloat((parseFloat($(this).text())/previousCoinType.value)*currentCoinType.value), 2)+ '</div>');
		});
	});
	
	$('#dollars').click(function(){
		var previousCoinType = currentCoinType;
		currentCoinType = dollars; 
		actualizeCart();
		actualizeTotal();
		actualizeCount();
		$('*').filter('#PriceTag').text(currentCoinType.toString());
		$('*').filter('#PriceNumber').replaceWith(function(){
			return ('<div id="PriceNumber" >' + roundNumber(parseFloat((parseFloat($(this).text())/previousCoinType.value)*currentCoinType.value), 2)+ '</div>');
		});
	});
	
	$('#whereAreWe').click(function(){
		initializeMap();
	});
	
function cateLink(id){
	currentCategory=getCategory(id);
	$("#main").load("./html/articles.html #main > *");
	currentSubCategory=undefined;
	reloadArticlesScript();
	reloadItemsManagerScript();
	setTimeout("loadItems(currentCategory, 1)", 100);
	setTimeout('addNavigation("'+currentCategory.name+'", 1)',500);
}

function getCategory(id){
	var i = 0;
	while(i < CategoriesList.categories.length){
		if(CategoriesList.categories[i].number == id){
			return CategoriesList.categories[i];
		}
		i++;
	}
}
	
	function searchSC(id){
				
		var i=0;
		var j=0;
		var c;
		for( ;i<CategoriesList.categories.length;i++){
			
			c=CategoriesList.categories[i];
			
			for(;j< c.subcategories.length;j++){
				
				if(c.subcategories[j].number==id){
					return c.subcategories[j];
				}
			}
			j=0;
		}
	
	}
	
	function addNavigation(name, level){
			alert(level);
			var i = level;
			while(i < 10){
				$("#level" + i).remove();
				i++;
			}
			$('#navigation ul').append('<li class="navigationItem"> &gt; </li>');
			$('#navigation ul').append('<li id="level' + level + '" class="navigationItem" >'+ name+'</li>'); 
	}


