    $('.Books_link').click(function(){
		currentCategory=CategoriesList.categories[1];
		$("#main").load("./html/articles.html #main > *");
		reloadArticlesScript(currentCategory.name);
		reloadItemsManagerScript();
		setTimeout("loadItems(currentCategory, 1)", 100);
	});

	$('.DVD_link').click(function(){
		currentCategory=CategoriesList.categories[0];
		$("#main").load("./html/articles.html #main > *");
		
		reloadArticlesScript(currentCategory.name);
		reloadItemsManagerScript();
		setTimeout("loadItems(currentCategory, 1)", 100);
	});
	
	
	$('.subitem').click(function(){


			var name=$(this).attr('id');
			var cs=null;


			cs=searchSC(name);	
			CurrentSubCategory=cs;	

			$("#main").load("./html/articles.html #main > *");

			loadItems(cs, 1);
			currentCategory=cs.category;
			initMenu();	
			// NO ANDA     $("#Horror").css({'background':'#aaa','border-left' : '5px #6D929B solid' , 'padding-left' : '15px'});
			setTimeout("addNavigation(\'"+cs.name+"\')",500);
			

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


