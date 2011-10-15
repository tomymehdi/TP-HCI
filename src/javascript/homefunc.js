
    $('.Books_link').click(function(){
	
		$("#main").load("./html/articles.html #main > *");
		reloadArticlesScript(CategoriesList.categories[1].name);
		reloadItemsManagerScript();
		reloadjsScript();
		setTimeout("loadItems(CategoriesList.categories[1], 1)", 100);
	});

	$('.DVD_link').click(function(){
		$("#main").load("./html/articles.html #main > *");
		reloadArticlesScript(CategoriesList.categories[0].name);
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
	
