function buyItem(number){
	var i = parseInt(document.getElementById("sel" + number).options[parseInt(document.getElementById("sel" + number).options.selectedIndex)].value);
	while(i > 0){
		cart.addItem(partialList.items[parseInt(number)]);
		i--;
	}
	actualizeCart();
}

function removeItemFromCart(item){
	var items = cart.getItems();
	for(var i = 0; i < cart.getItemCount() ; i++){
		if(items[i] == item){
			items.splice(1,i);
		}
	}
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function addToWishlist(number){
	var i = parseInt(document.getElementById("sel" + number).options[parseInt(document.getElementById("sel" + number).options.selectedIndex)].value);
	while(i > 0){
		wishlist.addItem(itemList.items[parseInt(number)]);
		i--;
	}
	actualizeWishlist();
}

function actualizeCart(){
	document.getElementById("itemCount").innerHTML=cart.items.length;
	document.getElementById("totalCount").innerHTML=' ' + currentCoinType + ' ' + roundNumber(cart.total(), 2);
}

function actualizeWishlist(){
	document.getElementById("wishedItems").innerHTML= wishlist.items.length;
}

function loadItems(c, page){
	
	currentPage = page;
	if(c.category){
		
		currentCategory = c.category;
		
	}
	else{
		currentCategory=c;
		CurrentSubCategory=undefined;
	}
	
	itemList = new ItemList();
	
	if(c.category){
		loadListBSC(itemList, c, page);
	}
	else{
		loadListBC(itemList, c, page);
	}
	$('#Items').empty();
	$('#Items').append('<img id="loading" src="./images/itemSelector/loadbar.gif" />');
	setTimeout("continueLoading(0)", 1000);
}

function continueLoading(number){
	if(itemList.items.length == 0){
		if(number == 10){
			alert("We can't establish connection to our servers. Please check out your internet connection.");
		}
		newNumber = number + 1;
		setTimeout("continueLoading(newNumber)", 1000);
		return;
	}
	partialList = new ItemList();
	var i = 0;
	var item;
	while(i < itemList.items.length){
		item = itemList.items[i];
		partialList.addItem(item);
		i++;
	}
	i = 0;
	$('#Items').empty();
	while(i < partialList.items.length){
		item = partialList.items[i];
		$('#Items').append('<div id="Item"><div id="itemName" onclick="bringInfo(' + i + ')" class="pointer">' + roundString(item.name, 25) + '</div><img id="Image" class="pointer" onclick="bringInfo(' + i + ')" src="'  + item.imageSource + '"></img><div id="Options"><button onclick="buyItem(' + i +')" class="buyButton"></button><button onclick="addToWishlist(' + i + ')" class="addToWishlistButton"></button><select id="sel' + i + '" size="1" class="quantity"><option value="1">1 </option selected="selected"> <option value="2">2 </option> <option value="3">3 </option><option value="4">4 </option><option value="5">5 </option><option value="6">6 </option><option value="7">7 </option><option value="8">8 </option><option value="9">9</option></select><div id="Price"><div id="PriceTag">' + currentCoinType + '</div><div id="PriceNumber" >' +roundNumber(item.price*currentCoinType.value, 2) + '</div></div></div></div>');
		i++;
	}
	$('#pageNumber').remove();
	$('#prevnext').append('<div id="pageNumber"> PAGE ' + currentPage + ' of ' + getMaxPage() + '</div>');
}

function bringInfo(n){
	
	url='./service/Catalog.groovy?method=GetProduct&product_id='+itemList.items[parseInt(n)].number;

	var request;

		if (window.XMLHttpRequest)
		{
			request=new XMLHttpRequest();
		}
		else
		{
			request=new ActiveXObject("Microsoft.XMLHTTP");
		}

		request.onreadystatechange=function(){

			if (request.readyState==4 && request.status==200){
				
				if(itemList.items[parseInt(n)].categoryId==1){
					
					var actors=request.responseXML.documentElement.getElementsByTagName("actors")[0].firstChild.nodeValue;
					var lang=request.responseXML.documentElement.getElementsByTagName("language")[0].firstChild.nodeValue;
					var subt=request.responseXML.documentElement.getElementsByTagName("subtitles")[0].firstChild.nodeValue;
					var region=request.responseXML.documentElement.getElementsByTagName("region")[0].firstChild.nodeValue;
					var release_date=request.responseXML.documentElement.getElementsByTagName("release_date")[0].firstChild.nodeValue;
					var run_time=request.responseXML.documentElement.getElementsByTagName("run_time")[0].firstChild.nodeValue;
					
				alert('Title: '+itemList.items[parseInt(n)].name+'\n\n Actors: '+actors+'\n\n Language: '+lang+' \n\n Subtitles: '+subt+' \n\n Region: '+region+' \n\n Release_date: '+release_date+'\n\n Duration: '+run_time);

				}
				if(itemList.items[parseInt(n)].categoryId==2){
					
					var authors=request.responseXML.documentElement.getElementsByTagName("authors")[0].firstChild.nodeValue;
					var publisher=request.responseXML.documentElement.getElementsByTagName("publisher")[0].firstChild.nodeValue;
					var pub_date=request.responseXML.documentElement.getElementsByTagName("published_date")[0].firstChild.nodeValue;
					var lang= request.responseXML.documentElement.getElementsByTagName("language")[0].firstChild.nodeValue;
					
				
				alert('Title: '+itemList.items[parseInt(n)].name+'\n\n Authors: '+authors+'\n\n Publisher: '+publisher+' \n\n Published date: '+pub_date+'\n\n Language: '+lang);
					
				}

	           

			}
		}

		request.open("GET",url,true);
		request.send();
			
	
}

function goTo(src){
	alert(src);
	window.location = src;
}

function roundString(string, num){
	if(string.length > num){
		return string.substr(0, num) + "...";
	}
	return string;
}

function getMaxPage(){
	return parseInt((itemQty/getPageSize()) + 0.99999);
}

function loadListBC(response, c, page){
	url='./service/Catalog.groovy?method=GetProductListByCategory&language_id='+currentLanguage.id+'&category_id=' + c.number + '&order=' + getOrder() + '&items_per_page=' + getPageSize() + '&page='+ page;
	var request;
	var xx,x,i;
	if (window.XMLHttpRequest)
	{
		request=new XMLHttpRequest();
	}
	else
	{
		request=new ActiveXObject("Microsoft.XMLHTTP");
	}
	request.onreadystatechange=function(){
		if (request.readyState==4 && request.status==200){
			x=request.responseXML.documentElement.getElementsByTagName("product");
			for (i=0;i<x.length;i++)
			{
				xx = x[i];
				product = new Item(xx.getElementsByTagName("name")[0].firstChild.nodeValue, "desc", xx.getElementsByTagName("price")[0].firstChild.nodeValue, xx.getElementsByTagName("subcategory_id")[0].firstChild.nodeValue, xx.getElementsByTagName("image_url")[0].firstChild.nodeValue, xx.getAttribute("id"), xx.getElementsByTagName("category_id")[0].firstChild.nodeValue);
				response.addItem(product);
			}
			itemQty= request.responseXML.documentElement.getElementsByTagName("products")[0].getAttribute("size");
		}
	}
	request.open("GET",url,true);
	request.send();
}

function loadListBSC(response, sc, page){
	
	url='./service/Catalog.groovy?method=GetProductListBySubcategory&language_id='+currentLanguage.id+'&category_id=' + sc.category.number + '&subcategory_id=' + sc.number+'&order=' + getOrder() + '&items_per_page=' + getPageSize() + '&page='+ page;
	var request;
	var xx,x,i;
	if (window.XMLHttpRequest)
	{
		request=new XMLHttpRequest();
	}
	else
	{
		request=new ActiveXObject("Microsoft.XMLHTTP");
	}
	request.onreadystatechange=function(){
		if (request.readyState==4 && request.status==200){
			x=request.responseXML.documentElement.getElementsByTagName("product");
			for (i=0;i<x.length;i++)
			{
				xx = x[i];
				product = new Item(xx.getElementsByTagName("name")[0].firstChild.nodeValue, "desc", xx.getElementsByTagName("price")[0].firstChild.nodeValue, xx.getElementsByTagName("subcategory_id")[0].firstChild.nodeValue, xx.getElementsByTagName("image_url")[0].firstChild.nodeValue,xx.getAttribute("id"),xx.getElementsByTagName("category_id")[0].firstChild.nodeValue);
				response.addItem(product);
			}
			itemQty= request.responseXML.documentElement.getElementsByTagName("products")[0].getAttribute("size");
		}
	}
	request.open("GET",url,true);
	request.send();
}

function getOrder(){

	return document.getElementById("sort").options[document.getElementById("sort").options.selectedIndex].value;

}

function getPageSize(){
	return document.getElementById("pageSize").options[document.getElementById("pageSize").options.selectedIndex].value;
}

function get(parent, tag){
	return parent.getElementsByTagName(tag)[0].firstChild.nodeValue;
}
