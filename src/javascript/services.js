function Common(basicURL){
	this.basicURL = basicURL;
}

Common.prototype.getLanguages = function(response){
	response = new Array();
//	url = this.basicURL + "method=getLanguageList";
//	loadLanguages(url, response);
	loadLanguages(this.basicURL + "method=GetLanguageList", response);
	var i = 0;
}

function Security(basicURL){
	this.basicURL = basicURL;
}

function Catalog(basicURL){
	this.basicURL = basicURL;
}

function Order(basicURL){
	this.basicURL = basicURL;
}

function loadLanguages(url, response){
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
				var language = new Language(xx.getAttribute("id"),  xx.getElementsByTagName("name")[0].firstChild.nodeValue,  xx.getElementsByTagName("code")[0].firstChild.nodeValue);
				response.addItem(language);
			}
		}
	}
	request.open("GET",url,true);
	request.send();
}

$(document).ready( function() {
	common = new Common("./service/Common.groovy?");
	common.getLanguages(languages);
	myLanguages(languages);
});

function myLanguages(languages){
	var i;
	for(i = 0; i < languages.items.length; i++){
		alert(languages.items[i]);
	}
}