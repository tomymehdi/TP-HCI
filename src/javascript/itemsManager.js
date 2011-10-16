function buyItem(number){
	var i = parseInt(document.getElementById("sel" + number).options.selectedIndex);
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
	var i = parseInt(document.getElementById("sel" + number).options.selectedIndex);
	while(i > 0){
		wishlist.addItem(itemList.items[parseInt(number)]);
		i--;
	}
	actualizeWishlist();
}

function actualizeCart(){
	document.getElementById("itemCount").innerHTML="You have " + cart.items.length + " items";
	document.getElementById("totalCount").innerHTML="Total: "+ currentCoinType + ' ' + roundNumber(cart.total(), 2);
}

function actualizeWishlist(){
	document.getElementById("wishedItems").innerHTML="You have " + wishlist.items.length + " items";
}

function loadItems(c, page){
	currentPage = page;
	currentCategory = c;
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
		if(number > 10){
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
		$('#Items').append('<div id="Item">'+
		'<div id="itemName" onclick="bringInfo(' + i + ')" class="pointer">' + roundString(item.name, 25) + '</div>'+
		'<img id="Image" class="pointer" onclick="bringInfo(' + i + ')" src="'  + item.imageSource + '"></img>'+
		'<div id="Options"><button onclick="buyItem(' + i +')" class="buyButton"></button>'+
		'<button onclick="addToWishlist(' + i + ')" class="addToWishlistButton"></button>'+
		'<select id="sel' + i + '" size="1" class="quantity"> <option selected="selected">0 </option> <option>1 </option> <option>2 </option> <option>3 </option><option>4 </option><option>5 </option><option>6 </option><option>7 </option><option>8 </option><option>9</option></select><div id="Price"><div id="PriceTag">' + currentCoinType + '</div><div id="PriceNumber" >' +roundNumber(item.price*currentCoinType.value, 2) + '</div></div></div></div>');
		i++;
	}
	$('#pageNumber').remove();
	$('#prevnext').append('<div id="pageNumber"> PAGE ' + currentPage + ' of ' + getMaxPage() + '</div>');
}

function bringInfo(number){
	alert(itemList.items[parseInt(number)].name);
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
	url='./service/Catalog.groovy?method=GetProductListByCategory&language_id='+currentLanguage+'&category_id=' + c.number + '&order=' + getOrder() + '&items_per_page=' + getPageSize() + '&page='+ page;
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
				product = new Item(xx.getElementsByTagName("name")[0].firstChild.nodeValue, "desc", xx.getElementsByTagName("price")[0].firstChild.nodeValue, xx.getElementsByTagName("subcategory_id")[0].firstChild.nodeValue, xx.getElementsByTagName("image_url")[0].firstChild.nodeValue);
				response.addItem(product);
			}
			itemQty= request.responseXML.documentElement.getElementsByTagName("products")[0].getAttribute("size");
		}
	}
	request.open("GET",url,true);
	request.send();
}


function loadListBSC(response, sc, page){
	
	url='./service/Catalog.groovy?method=GetProductListBySubcategory&language_id='+currentLanguage+'&category_id=' + sc.category.number + '&subcategory_id=' + sc.number+'&order=' + getOrder() + '&items_per_page=' + getPageSize() + '&page='+ page;
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
				product = new Item(xx.getElementsByTagName("name")[0].firstChild.nodeValue, "desc", xx.getElementsByTagName("price")[0].firstChild.nodeValue, xx.getElementsByTagName("subcategory_id")[0].firstChild.nodeValue, xx.getElementsByTagName("image_url")[0].firstChild.nodeValue);
				response.addItem(product);
			}
			itemQty= request.responseXML.documentElement.getElementsByTagName("products")[0].getAttribute("size");
		}
	}
	request.open("GET",url,true);
	request.send();
}


function getOrder(){
//	alert(document.getElementById("sort").options[document.getElementById("sort").options.selectedIndex].value);
	return document.getElementById("sort").options[document.getElementById("sort").options.selectedIndex].value;
}

function getPageSize(){
	return document.getElementById("pageSize").options[document.getElementById("pageSize").options.selectedIndex].value;
}

function get(parent, tag){
	return parent.getElementsByTagName(tag)[0].firstChild.nodeValue;
}
