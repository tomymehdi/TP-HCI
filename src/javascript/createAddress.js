$(document).ready( function() {


loadCount();


});

$('#Submit_address').click(function(){
	
	createAdress();
	
});

//CreateAddress
function createAdress(){

	
	loadCount();
	
		
		var fn= $('#fullname').val();
		var addr=$('#adress').val();
		var coun=$('#country_select option:selected').attr('value');
		var stat=$('#state_select option:selected').attr('value');
		var cty=$('#city').val();
		var zc=$('#zipcode').val();
		var pn=$('#phone').val();
				
				
	//	checkoutAddress=new Address()
		
		var ans=sendPetition(fn,addr,coun,stat,cty,zc,pn);
		
		
}

function loadStat(count){
		
		$('#state_select').append('<option>--------</option>');
	
	var i;
	
	for(i=0;i<count.states.length;i++){
		var stat=count.states[i];
		$('#state_select').append('<option value="' + stat.number +'" > ' + stat.name + ' </option>');		
	}
	
}
function loadCount(){
	
	var i;
	for(i=0;i<CountriesList.countries.length;i++){
		var count=CountriesList.countries[i];
		$('#country_select').append('<option value="' + count.number +'" > ' + count.name + ' </option>');		
	}
}
$('#country_select').change( function(){
	
	
	$('#state_select').empty();

	var val=$('#country_select option:selected').attr('value');

	if(val!=null){
		
		
		var count= searchCountryByID(val);
		currentCountry = count;
		
		
		loadStat(count);	
	}
});



function sendPetition(fn,addr,counid,stat,cty,zc,pn){



		
			var addHtml='<address>'+
			'<full_name>'+  fn  +'</full_name>'+
			'<address_line_1>'+  addr +'</address_line_1> <address_line_2 />'+
			'<country_id>'+  counid    +'</country_id>'+
			'<state_id>'+ stat	+'</state_id>'+
			'<city>'+	cty	+'</city>'+
			'<zip_code>'+zc	+'</zip_code>'+
			'<phone_number>'+  pn   +'</phone_number>'+
			'</address>';
			
		
url='./service/Order.groovy?method=CreateAddress&username='+CurrentUsername+'&authentication_token='+CurrentToken+'&address='+addHtml;

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
						
			
			var Nadd = new Address(fn,addr,counid,stat,cty,zc,pn);
			
			AddressList.add(Nadd);
						
			selectAdd(AddressList.getAdd().length-1);
			
			//confirmBuying();
			return true;
			
		} else if(stat == "fail"){
			
			var string = "";
			$(request.responseXML).find("error").each(function(){
				string += $(this).attr("message") + "\n";
			});
			alert(string);
			return false;
						
		}
	}
}
	request.open("POST",url,true);
	request.send();
	
}


//VALIDACIONES
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
