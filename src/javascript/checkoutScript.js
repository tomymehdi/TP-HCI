$(document).ready( function() {


//VOLVER A PONER CREATE CUANDO ESTE PARA TERMINAR

//createOrder();
continueOrder();
});

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
			
			continueOrder();

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


function continueOrder(){
	
	
	var i;
	for(i=0;i<CountriesList.countries.lenght;i++){
		var count=CountriesList.countries[i];
		$('#country_select').append('<option value="' + count.name +'"  ></option>');
		
	}
		
	
	//CreateAddress
}


$(function(){
	var fullname = new LiveValidation( "fullname", { validMessage: "Ok!", wait: 500 } );	
	fullname.add( Validate.Presence, { failureMessage: "Please, enter your full name" } );
	fullname.add( Validate.Length, { minimum: 1, maximum: 80 } );
	
});
$(function(){
	var adress = new LiveValidation( "adress", { validMessage: "Ok!", wait: 500 } );	
	adress.add( Validate.Presence, { failureMessage: "Please, enter your adress" } );
	adress.add( Validate.Length, { minimum: 1, maximum: 80 } );
	
});
$(function(){
	var city = new LiveValidation( "city", { validMessage: "Ok!", wait: 500 } );	
	city.add( Validate.Presence, { failureMessage: "Please, enter your city name" } );
	city.add( Validate.Length, { minimum: 1, maximum: 80 } );
	
});
$(function(){
	var zipcode = new LiveValidation( "zipcode", { validMessage: "Ok!", wait: 500 } );	
	zipcode.add( Validate.Presence, { failureMessage: "Please, enter your zip code" } );
	zipcode.add( Validate.Length, { minimum: 1, maximum: 8 } );
	
});
$(function(){
	
	var phone = new LiveValidation( "phone", { validMessage: "Ok!", wait: 500 } );	
	phone.add( Validate.Presence, { failureMessage: "Please, enter your phone number" } );
	phone.add( Validate.Length, { minimum: 1, maximum: 25 } );
	
});
