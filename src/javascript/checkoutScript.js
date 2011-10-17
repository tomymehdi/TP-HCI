
$(document).ready( function() {

	getDirections();

	createOrder();
	
	setTimeout('appendAdds()',4000);
	
//QUIERO QUE SE QUEDE ACA HASTA QUE NO HAGA TODO DE GET DIRECTIONS Y CREATE ORDER, QUE NO ENTERE AL IF PORQUE NO VA A 
//ENCONTRAR LAS VARIABLES Q NECESITA

//	if(AddressList.addresses.length==0){
	
//		goToCreateAdd();
	
//	}
//	else{
	
	
	
		
//	}


});



function appendAdds(){
	
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
					'<div lang="select_address" class="CartButtonC" id="select_address"  onclick="checkoutAddress=new Address('+a.name+','+a.addline1+','+count.name+','+stat.name+','+a.city,a.zip_code+','+a.phone_number+')"> select this address</div>'
					
				);
			}
			
			
		$('#TextArea').append('<div lang="create_address" class="CartButton" id="create_address" onclick="goToCreateAdd()">create new address</div>');
		
		
}

function selectAdd(){

	
	checkoutAddress=new Address();
	confirmBuying();
	
	
}
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

	
	$('#TextArea').append(
		
		'<div id="AddOption"><h5 lang="Addres ">Checkout confirmation</h5></div>'+
		'<div id="address"> Full Name: '+checkoutAddress.name+'</div>'
		
		
		
	);
	
	
	
}


function goToCreateAdd(){
$("#TextArea").load("./html/createAddres.html #TextArea > *");
setTimeout('reloadCreateAddresstScript()',1000);
}
