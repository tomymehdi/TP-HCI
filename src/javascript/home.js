$(document).ready( function() {	
	
	
	var opacity = 1;
	var toOpacity = 0.5;
	var duration = 2500;
	
	currentCoinType = dollars;

    $("#main").load("./html/home.html #main > *");   

   	setTimeout("appendCats(0)", 100);
	
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
	
	appendLanguages();
	
	$('#idioma_select').change(translate);
	
	actualizeCart();
	actualizeWishlist();
});

function translate(){
	var url = "languages.xml";
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    changeLanguage(xmlhttp.responseXML.documentElement);
	    }
	  }
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function changeLanguage(doc){
	var toChange = document.getElementsByTagName('*');
	var i = 0;
	while(i < languageList.items.length){
		if(languageList.items[i].id == getCurrentLanguageId()){
			currentLanguage = languageList.items[i].id;
		}
		i++;
	}
	i = 0;
	while(i < toChange.length){
		if(toChange[i].getAttribute("lang")){
			toChange[i].innerHTML = "";
			words = doc.getElementsByTagName("language")[getCurrentLanguageId()- 1].getElementsByTagName('*');
			var j = 0;
			var stop = false;
			while(!stop && j < words.length){
				if(toChange[i].getAttribute("lang") == words[j].getAttribute("id")){
					toChange[i].innerHTML = words[j].firstChild.nodeValue;
					stop = true;
				}
				j++;
			}
		}
		i++;
	}
}

function getCurrentLanguageId(){
	return parseInt(document.getElementById("idioma_select").options[parseInt(document.getElementById("idioma_select").options.selectedIndex)].value);
}

function appendLanguages(seconds){
	if(languageList.items.length == 0 || languageList.items.length == undefined){
		if(seconds == 10){
			alert("The connection with our server is slow or is not connected at all. Please check our your internet connection.");
		}
		newSeconds = seconds+1;
		setTimeout("appendLanguages(newSeconds)", 1000);
		return;
	}
	var i = 0;
	var language;
	while(i < languageList.items.length){
		language = languageList.items[i];
		$('#idioma_select').append('<option value="' + language.id +'" > ' + language.name + ' </option>');
		i++;
	}
	translate();
}


function appendCats(seconds){
	if(CategoriesList.categories.length == 0){
		if(seconds == 10){
			alert("The connection with our server is slow or is not connected at all. Please check our your internet connection.");
		}
		newSeconds = seconds+1;
		setTimeout("appendCats(newSeconds)", 1000);
		return;
	}

	var j=0;
	var cate;
	$('#FooterCat').empty(); 
	$('#main_opt').remove();
	while(j < CategoriesList.categories.length){
		cate = CategoriesList.categories[j];
		$('#main').append('<div class="main_opt"><div  class="'+cate.name+'_link  title pointer" >'+cate.name+'</div>');
		$('#FooterCat').append('<li><a  class="'+cate.name+'_link pointer">'+cate.name+'</a></li>');
		j++;
	}
}

$(function(){
	$('.fadein1 div:gt(0)').hide();
	setInterval(function(){
	$('.fadein1 :first-child').fadeOut().next('div').fadeIn().end().appendTo('.fadein1');},
	3000);
}); 