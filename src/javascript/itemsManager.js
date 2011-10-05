function User(name, password, cart){
	this.name = name;
	this.password = password;
	this.cart = cart;
	this.addresses = new Array();
}

function CoinType(value, string){
	this.value = value;
	this.string = string;
}

CoinType.prototype.toString = function(){
	return this.string.toString();
}

function Cart(){
	this.items = new Array();
}

function ItemList(){
	this.items = new Array();
}

ItemList.prototype.addItem = function(item){
	this.items.push(item);
}

Cart.prototype.total = function (){
	var count = 0;
	var i = 0;
	for(i = 0 ; i < this.items.length; i++){
		count += parseFloat(this.items[i].price);
	}
	return count*currentCoinType.value;
}

Cart.prototype.addItem = function (item){
	this.items.push(item);
}

Cart.prototype.getItemCount = function() {
	return this.items.length;
}

function Item(name, description, price, subcategory, imageSource){
	this.name = name;
	this.description = description;
	this.price = price;
	this.subcategory = subcategory;
	this.imageSource = imageSource;
}

function Category(name){
	this.name = name;
	this.subcategories = new Array();
}

Category.prototype.add = function (category){
	this.subcategories.push(category);
}

function Subcategory(name, category){
	this.name = name;
	this.category = category;
	category.add(this);
}

// GLOBALES
pageSize = 10;
movies = new Category("Movies");
cds = new Category("CDs");
books = new Category("Books");
magic = new Subcategory("Magia", movies);
invento = new Subcategory("Invento", books);
animation = new Subcategory("Animacion", movies);
lots = new Subcategory("LOTS", cds);
myItem = new Item("Harry Potter", "Rescued from the outrageous neglect of his aunt and uncle, a young boy with a great destiny proves his worth while attending Hogwarts School of Witchcraft and Wizardry.", "10.50", magic, "Here goes the image");
myItem2 = new Item("Aladdin", "Aladdin, a street urchin, accidentally meets Princess Jasmine, who is in the city undercover. They love each other, but she can only marry a prince.", "1.99", animation, "Here goes the image");
myItem3 = new Item("HCI Reloaded", "Epic battle between an eye-tracking robot and an over-sized fingers cell phone user", "149.99", animation, "Here goes the image");
myItem4 = new Item("Algo", "Algo algo", "12.99", invento, "Here goes the image");
myItem5 = new Item("Lala", "lalalal", "16.39", invento, "Here goes the image");
cart = new Cart();
wishlist = new Cart();
itemList = new ItemList();
partialList = new ItemList();
itemList.addItem(myItem);
itemList.addItem(myItem2);
itemList.addItem(myItem3);
itemList.addItem(myItem4);
itemList.addItem(myItem5);
var h = 0;
while(h < 10){
	itemList.addItem(new Item("Item " + h.toString(), "Desc", roundNumber((h*3.67), 2).toString(), lots, "IMAGE OVER HERE!"));
	h++;
}
euros = new CoinType("0.75", "E");
dollars = new CoinType("1", "U$S");
pesos = new CoinType("4.2", "AR$");


// VARIABLES
var currentPage;
var currentCategory;
var currentCoinType;

function buyItem(number){
	var i = parseInt(document.getElementById("sel" + number).options.selectedIndex);
	while(i > 0){
		cart.addItem(partialList.items[parseInt(number)]);
		i--;
	}
	actualizeCart();
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

function loadItems(category, page){
	currentPage = 0;
	currentCategory = category;
	var i = 0;
	partialList = new ItemList();
	while(i < itemList.items.length){
		item = itemList.items[i];
		if(item.subcategory.category == category){
			partialList.addItem(item);
		}
		i++;
	}
	i = 0;
	while(i < partialList.items.length){
		item = partialList.items[i];
		$('#Items').append('<div id="Item"><div id="itemName">' + item.name + '</div><div id="Image"> ' + item.imageSource + '</div><div id="Options"><button onclick="buyItem(' + i +')" class="buyButton"></button><button onclick="addToWishlist(' + i + ')" class="addToWishlistButton"></button><select id="sel' + i + '" size="1" class="quantity"> <option selected="selected">0 </option> <option>1 </option> <option>2 </option> <option>3 </option><option>4 </option><option>5 </option><option>6 </option><option>7 </option><option>8 </option><option>9</option></select><div id="Price"><div id="PriceTag">' + currentCoinType + '</div><div id="PriceNumber" >' +(item.price*currentCoinType.value) + '</div></div></div></div>');
		i++;
	}
}

//function load(){
//	urld = "http://eiffel.itba.edu.ar/hci/service/Catalog.groovy?method=GetProductListByCategory&language_id=1&category_id=1";
//	var request;
//	if (window.XMLHttpRequest)
//	{// code for IE7+, Firefox, Chrome, Opera, Safari
//		request=new XMLHttpRequest();
//	}
//	else
//	{// code for IE6, IE5
//		request=new ActiveXObject("Microsoft.XMLHTTP");
//	}
//	$.ajax({
//		url: "http://eiffel.itba.edu.ar/hci/service/Catalog.groovy?method=GetProductListByCategory&language_id=1&category_id=1",
//		type: "GET",
//		dataType: "xml",
//		success: alert(request.responseXML.documentElement.getElementByTagName("product")),
//	});
//}

function loadLanguages(){
	url = "http://eiffel.itba.edu.ar/hci/service/Common.groovy?method=GetLanguageList";
	var request;
	var txt,xx,x,i;
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
			alert(request.status);
			txt="<table border='100'><tr><th>Name</th><th>code</th></tr>";
			x=request.responseXML.documentElement.getElementsByTagName("language");
			for (i=0;i<x.length;i++)
			{
				txt=txt + "<tr>";
				xx=x[i].getElementsByTagName("name");
				{
					try
					{
						txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
					}
					catch (er)
					{
						txt=txt + "<td>&nbsp;</td>";
					}
				}
				xx=x[i].getElementsByTagName("code");
				{
					try
					{
						txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
					}
					catch (er)
					{
						txt=txt + "<td>&nbsp;</td>";
					}
				}
				txt=txt + "</tr>";
			}
			txt=txt + "</table>";
			document.getElementById("Items").innerHTML=txt;
		}
	}
	request.open("GET",url,true);
	request.send();
}