
$(document).ready( function() {

getDirections();
setTimeout('',4000);
createOrder();

if(AddressList.addresses.length==0){
	
	goToCreateAdd();
	
}
else{
	
	var i=0;
	for(;i<AddressList.addresses.length;i++){
	var a=AddressList.addresses[i];
	var count=searchCountryByID(a.countryID);
	var stat=searchStateByID(a.countryID,a.stateID);
	$('#TextArea').append(
		
		'<div id="upOptions"><h5 lang="Addres ">Addres Nº'+i+'</h5></div>'+
		'<div id="address"> Full Name: '+a.name+'\n Address: '+a.addline1+'\n Country: '+count+'\n State: '+stat+'\n City: '+a.city+'\n Zip code: '+a.zip_code+'\n Phone number:' +a.phone_number+'</div>'
	);
	
	}
}


});


function getDirections(){
	

	url='./service/Order.groovy?method=GetAddressList&username='+CurrentUsername+'&authentication_token='+CurrentToken;

	var x,stat,xx;
	var request;

	if (window.XMLHttpRequest){
		request=new XMLHttpRequest();
	}else {
		request=new ActiveXObject("Microsoft.XMLHTTP");
	}

	request.onreadystatechange = function(){

		if(request.readyState==4 && request.status==200){

			stat=$(request.responseXML).find("response").attr("status");

			if(stat == "ok"){

					x=request.responseXML.documentElement.getElementsByTagName("address");

		            for (i=0;i<x.length;i++)
					{
						xx = x[i];
						address = new Address(xx.getElementsByTagName("full_name")[0].firstChild.nodeValue, xx.getElementsByTagName("address_line_1")[0].firstChild.nodeValue,xx.getElementsByTagName("country_id")[0].firstChild.nodeValue,xx.getElementsByTagName("state_id")[0].firstChild.nodeValue,xx.getElementsByTagName("city")[0].firstChild.nodeValue,xx.getElementsByTagName("zip_code")[0].firstChild.nodeValue,xx.getElementsByTagName("phone_number")[0].firstChild.nodeValue);
						AddressList.add(address);
					}

			}


		 	else if(stat == "fail"){

				var string = "";
				$(request.responseXML).find("error").each(function(){
					string += $(this).attr("message") + "\n";
				});
				alert(string);

			}
		}
	}
		request.open("GET",url,true);
		request.send();
	
	
}

function searchCountryByID(id){
	
	
	
	var i;
	for(i=0;i<CountriesList.countries.length;i++){
	
		var count=CountriesList.countries[i];

		if(count.number==id){
			
			return count;
		}
	}
}


function searchStateByID(cid,sid){
	
	var c=searchCountryByID(cid);
	
	for(i=0;i<c.states.length;i++){
	
		var st=c.states[i];

		if(st.number==sid){
			
			return st;
		}
	}
	
}
function createOrder(){
		
url='./service/Order.groovy?method=CreateOrder&username='+CurrentUsername+'&authentication_token='+CurrentToken;

var x,stat,xx;
var request;
if (window.XMLHttpRequest){
	request=new XMLHttpRequest();
}else {
	request=new ActiveXObject("Microsoft.XMLHTTP");
}

request.onreadystatechange = function(){
	if(request.readyState==4 && request.status==200){
		
		stat=$(request.responseXML).find("response").attr("status");
		
		if(stat == "ok"){
			
			alert('se creo la orden');

		} else if(stat == "fail"){
			
			var string = "";
			$(request.responseXML).find("error").each(function(){
				string += $(this).attr("message") + "\n";
			});
			alert(string);
			
			
			//MANDO AL CARRITO DE NUEVO
			  	$("#main").load("./html/cart.html #main > *");
			
				reloadCartScript();
				reloadItemsManagerScript();
				translate();
				
		}
	}
}
request.open("GET",url,true);
request.send();

}


function goToCreateAdd(){
$("#TextArea").load("./html/createAddres.html #TextArea > *");
setTimeout('reloadCreateAddresstScript()',1000);
}
