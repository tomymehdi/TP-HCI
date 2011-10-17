
$(document).ready( function() {
	
	bool1= new Bool(false);
	bool2= new Bool(false);

	getDirections(bool1);

	createOrder(bool2);
	
		appendAdds(0, bool1, bool2);
	


});



function appendAdds(segs, b1, b2){
	if(!b1.state || !b2.state){
		if(segs == 20){
			alert("Connection is slow or null. Please check your internet connection");
		}
		newSegs = segs + 1;
		bool1 = b1;
		bool2 = b2;
		setTimeout("appendAdds(newSegs, bool1, bool2)", 1000);
		return;
	}
	
	
	
	if(AddressList.addresses.length==0){
	
		goToCreateAdd();
	
	}
	else{
		var i=0;
				
				
		for( ;i<AddressList.getAdd().length;i++){
		
				var a=AddressList.addresses[i];
				
				var count=searchCountryByID(a.countryID);
				
				
				var stat=searchStateByID(a.countryID,a.stateID);
				
				var cant=i+1;
				
				
				$('#TextArea').append(
		
					'<div id="AddOption"><h5 lang="Addres ">Address Nº'+cant+'</h5></div>'+
					'<div id="address"> Full Name: '+a.name+'</div>'+
					'<div id="address"> Address: '+a.addline1+'</div>'+
					'<div id="address"> Country: '+count.name+'</div>'+
					'<div id="address"> State: '+stat.name+'</div>'+
					'<div id="address"> City: '+a.city+'</div>'+
					'<div id="address"> Zip code: '+a.zip_code+'</div>'+
					'<div id="address"> Phone number:' +a.phone_number+'</div>'+
					'<div lang="select_address" class="CartButtonC" id="select_address"  onclick="selectAdd('+i+')"> select this address</div>'
					

				);
			}
		$('#TextArea').append('<div lang="create_address" class="CartButton" id="create_address" onclick="goToCreateAdd()">create new address</div>');
		}
		
}

function selectAdd(i){

	
	checkoutAddress=AddressList.addresses[i];
	confirmBuying();
	
	
}
function getDirections(bool){
	

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
		            bool.setValue(true);
					
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
function createOrder(bool){
		
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
		bool.setValue(true);	

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


function confirmBuying(){
	
	$('#TextArea').empty();

	var price=0;
	var items = cart.getItems();
	for(var i =0 ; i < cart.getItems().length;i++){
		price += items[i].price*currentCoinType.value;
	}
	var coun=searchCountryByID(checkoutAddress.countryID);
	var sta=searchStateByID(coun.number,checkoutAddress.stateID);
	$('#TextArea').append(
		
		'<div id="AddOption"><h5 lang="Addres ">Checkout confirmation</h5></div>'+
		'<h5 lang="Addres ">Address information</h5></div>'+
		'</br>'+
		'</br>'+
		'<div id="address"> Full Name: '+checkoutAddress.name+'</div>'+
		'<div id="address"> Adress: '+checkoutAddress.addline1+'</div>'+
		'<div id="address"> Country: '+coun.name+'</div>'+
		'<div id="address"> State: '+sta.name+'</div>'+
		'<div id="address"> City: '+checkoutAddress.city+'</div>'+
		'<div id="address"> Zip code: '+checkoutAddress.zip_code+'</div>'+
		'<div id="address"> Phone Number: '+checkoutAddress.phone_number+'</div>'+
		'</br>'+
		'</br>'+
		'<h5 lang="Addres ">Items information</h5></div>'+
		'</br>'+
		'</br>'+
		'<div id="address"> Items quantity: '+cart.getItems().length+'</div>'+
		'<div id="address"> Total amount: '+currentCoinType+''+price+'</div>'+
		'<button id="finish_buy">CONFIRM</button>'
		
	);
	
	
	
}


function goToCreateAdd(){
$("#TextArea").load("./html/createAddres.html #TextArea > *");
setTimeout('reloadCreateAddresstScript()',1000);
}
