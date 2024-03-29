
//PAISES

function CountriesList(){
	this.countries = new Array();
}
CountriesList.prototype.addCountry = function(count){
	this.countries.push(count);
}
function Country(name, number,code){
	this.name = name;
	this.number = number;
	this.code= code;
	this.states = new Array();
	
}
function State(name,number,code,countryId){
	this.name=name;
	this.number=number;
	this.code=code;
	this.countryId=countryId;
}
Country.prototype.addState = function (state){
	this.states.push(state);
}



function Language(id, name, code){
	this.id = id;
	this.code = code;
	this.name = name;
}

function User(name, password, cart){
	this.name = name;
	this.password = password;
	this.cart = cart;
	this.addresses = new Array();
}

//MONEDAS

function CoinType(value, string){
	this.value = value;
	this.string = string;
}	
CoinType.prototype.toString = function(){
	return this.string;
}


//ITEMS

function ItemList(){
	this.items = new Array();
}
ItemList.prototype.addItem = function(item){
	this.items.push(item);
}
function Item(name, description, price, subcategory, imageSource,number,categoryId){
	this.name = name;
	this.description = description;
	this.price = price;
	this.subcategory = subcategory;
	this.imageSource = imageSource;
	this.number=number;
	this.categoryId=categoryId;
}


//CART
function Cart(){
	this.items = new Array();
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
Cart.prototype.getItems = function(){
	return this.items;
}



//CATEGORY

function CategoriesList(){
	this.categories = new Array();
}
CategoriesList.prototype.addCategory = function(cat){
	this.categories.push(cat);
}
function Category(name, number, code){
	this.name = name;
	this.number = number;
	this.code=code;
	this.subcategories = new Array();
}
Category.prototype.add = function (category){
	this.subcategories.push(category);
}

function Subcategory(name, category, number){
	this.name = name;
	this.category = category;
	this.number = number;
}


//ADRESSES
function AddressList(){
	this.addresses = new Array();
}
AddressList.prototype.add = function(count){
	this.addresses.push(count);
}
AddressList.prototype.getAdd = function (){
	return this.addresses;
}
function Address(name, addline1,countryID,stateID,city,zip_code,phone_number,number){
	this.name = name;
	this.addline1 = addline1;
	this.countryID= countryID;
	this.stateID = stateID;
	this.city = city;
	this.zip_code = zip_code;
	this.phone_number = phone_number;
	this.number=number;
}

function Bool(state){
	this.state = state;
}

Bool.prototype.setValue = function(value){
	this.state = value;
}

// VARIABLES
var currentPage;
var currentCoinType = new CoinType("1", "U$S");
var itemQty;
var currentCategory;
var currentLanguage;
var currentCountry;
var CurrentSubCategory;
var AddressList;
var checkoutAddress;

var errorsXML;

var cart;
var wishlist;
var itemList;
var partialList;
var languageList;
var CategoriesList;
var CountriesList;
var CurrentUsername;
var CurrentToken;
var currentOrderID;

var euros;
var dollars;
var pesos;
var mains;


$(document).ready( function() {

	cart = new Cart();
	wishlist = new Cart();
	itemList = new ItemList();
	partialList = new ItemList();
	languageList = new ItemList();
	CategoriesList = new CategoriesList();
	CountriesList = new CountriesList();
	currentLanguage = new Language(1, "default", "def");
	AddressList= new AddressList();
	checkoutAddress= new Address();
	
	euros = new CoinType("0.6", "\u20ac");
	dollars = new CoinType("1", "U$S");
	pesos = new CoinType("4", "AR$");
	mains = new Array();

	if(languageList.items.length == 0){
		loadCommons();
	}
	
	reloadhomeScript();
	reloadhomeFunc();
	
});

function loadCommons()
{
	loadLanguages();
	loadCountries();
}	
function loadCountries(){
	
	
	url='./service/Common.groovy?method=GetCountryList&language_id='+currentLanguage.id;

	var request;
	var j=0;
	var cn;
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

				x=request.responseXML.documentElement.getElementsByTagName("country");

	            for (i=0;i<x.length;i++)
				{
					xx = x[i];
					cn = new Country(xx.getElementsByTagName("name")[0].firstChild.nodeValue ,xx.getAttribute("id"),xx.getElementsByTagName("code")[0].firstChild.nodeValue);
					CountriesList.addCountry(cn);
					loadStates(cn);
				}

			}
		}

		request.open("GET",url,true);
		request.send();
}

function loadStates(country){
	
	
	url='./service/Common.groovy?method=GetStateList&language_id='+currentLanguage.id+'&country_id='+country.number;

	var request;
	var j=0;
	var st;
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

				x=request.responseXML.documentElement.getElementsByTagName("state");

	            for (i=0;i<x.length;i++)
				{
					xx = x[i];
					st = new State(xx.getElementsByTagName("name")[0].firstChild.nodeValue ,xx.getAttribute("id"),xx.getElementsByTagName("code")[0].firstChild.nodeValue,xx.getElementsByTagName("country_id")[0].firstChild.nodeValue);
					country.addState(st);
					
				}

			}
		}

		request.open("GET",url,true);
		request.send();

	
	
	
}


function loadLanguages(){
	
	flagDeLlamadaALoadLanguages=true;
	
	url='./service/Common.groovy?method=GetLanguageList';
	
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
			x=request.responseXML.documentElement.getElementsByTagName("language");
			for (i=0;i<x.length;i++)
			{
				xx = x[i];
				var lang = new Language(xx.getAttribute("id"),  xx.getElementsByTagName("name")[0].firstChild.nodeValue,  xx.getElementsByTagName("code")[0].firstChild.nodeValue);
				languageList.addItem(lang);
			}
			currentLanguage=languageList.items[0];
		}
	}
	request.open("GET",url,true);
	request.send();
}



function loadMainCategories(){
	
	url='./service/Catalog.groovy?method=GetCategoryList&language_id='+currentLanguage.id;
	var request;
	var j=0;
	var cn;
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

				x=request.responseXML.documentElement.getElementsByTagName("category");

	            for (i=0;i<x.length;i++)
				{
					xx = x[i];
					cn = new Category(xx.getElementsByTagName("name")[0].firstChild.nodeValue ,xx.getAttribute("id"),xx.getElementsByTagName("code")[0].firstChild.nodeValue);
					CategoriesList.addCategory(cn);
					loadSubCategories(cn);
					
				}

			}
		}

		request.open("GET",url,true);
		request.send();

}
	
function loadSubCategories(categ){
	
	url='./service/Catalog.groovy?method=GetSubcategoryList&language_id='+currentLanguage.id+'&category_id='+categ.number;

	var request;
	var j=0;
	var cate;
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

				x=request.responseXML.documentElement.getElementsByTagName("subcategory");

	            for (i=0;i<x.length;i++)
				{
					xx = x[i];
					cat = new Subcategory(xx.getElementsByTagName("name")[0].firstChild.nodeValue, categ,xx.getAttribute("id"));
					categ.add(cat);
				}

			}
		}

		request.open("GET",url,true);
		request.send();


}