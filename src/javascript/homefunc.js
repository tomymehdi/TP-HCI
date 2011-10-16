    $('.Books_link').click(function(){
		currentCategory=CategoriesList.categories[1];
		$("#main").load("./html/articles.html #main > *");
		reloadArticlesScript(currentCategory.name);
		reloadItemsManagerScript();
		reloadjsScript();
		setTimeout("loadItems(currentCategory, 1)", 100);
	});

	$('.DVD_link').click(function(){
		currentCategory=CategoriesList.categories[0];
		$("#main").load("./html/articles.html #main > *");
		
		reloadArticlesScript(currentCategory.name);
		reloadItemsManagerScript();
		
		reloadjsScript();
		setTimeout("loadItems(currentCategory, 1)", 100);
	});
	
	
	$('.subitem').click(function(){
		
		
		var name=$(this).attr('id');
		var cs=null;
	
	
	//VAR MAÑANAAAAAAA  ver por que refresca mal y aparece el menu de books.
	
		addNavigation(name);
		
		cs=searchSC(name);		
	
		$("#main").load("./html/articles.html #main > *");
		reloadArticlesScript('DVD');
		reloadItemsManagerScript();
		reloadjsScript();		
		loadItems(cs, 1);

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
		
	$('#whereAreWe').click(function(){
		alert("hollo");
		initializeMap();
	});
		
		
	});
	
	function searchSC(name){
				
		var i=0;
		var j=0;
		var c;
		for( ;i<CategoriesList.categories.length;i++){
			
			c=CategoriesList.categories[i];
			
			for(;j< c.subcategories.length;j++){
				
				if(c.subcategories[j].name==name){
					return c.subcategories[j];
				}
			}
			j=0;
		}
	
	}
	
	function addNavigation(name){
			
			
		if(document.getElementById("Sc")){
			$("#Sc").remove();
		}	
		$('#navigation ul').append('<li class="navigationItem"> &gt; </li>');
		$('#navigation ul').append('<li id="Sc" class="navigationItem" >'+ name+'</li>');
	}
