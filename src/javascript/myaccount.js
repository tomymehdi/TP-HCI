

$('#Modify').live('click',function(){
    
	$('.MyAcInp :input').removeAttr('disabled');
    $('#Modify').replaceWith('<div id="Save" class="MyAccButton">Save</div>');

	setTimeout("reloadChangeInfo()",1500);
	
});
    
$('#Save').live('click',function(){
	
    $('.MyAcInp :input').attr('disabled', true);
    $('#Save').replaceWith('<div id="Modify" class="MyAccButton">Modify</div>');
	modifyAccount(	$('#EmailInput').attr('value') , $('#UserNameInput').attr('value'),$('#FirstNameInput').attr('value'),$('#BirthInput').attr('value'));
	

});
    
$('#PersonalInfo').live('click',function(){
    

 		$('#MenuSelection').replaceWith('<div id="MenuSelection">'+
    	 '<h4>Personal Information</h4>' +
		'<div  class="MyAcInp" >Name <input  id="FirstNameInput" type="text" disabled="disabled"class=" LV_invalid_field" ></input></div>'+
		'<div  class="MyAcInp" >Email <input id="EmailInput" type="text" disabled="disabled"class=" LV_invalid_field" ></input></div>'+
		'<div  class="MyAcInp" >Birth Date <input id="BirthInput" type="text" disabled="disabled" class=" LV_invalid_field"></input></div>'+
		'<div id="Modify" class="MyAccButton">Modify</div>'+
		
    	 '</div>'); 
		
		reloadChangeInfo();
		getAccount();
});
    
$('#ShippingInfo').live('click',function(){
  

	
  	$('#MenuSelection').replaceWith('<div id="MenuSelection"><h4>Shipping Information</h4></div>');

		
	
	getDirections();
	
 	setTimeout('appendAdds()',5000);

	
		
});
   
$('#ChangePassword').live('click',function(){
	
	
	var p=$('#PassChange').attr('value');
	var np=$('#NPass').attr('value');
	
	
	url='./service/Security.groovy?method=ChangePassword&username='+CurrentUsername+'&password='+p+'&new_password='+np;
	
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
				alert('You have change your password succesfully.');
			} else if(stat == "fail"){
				var string = "";
				$(request.responseXML).find("error").each(function(){
					string += $(this).attr("message") + "\n";
				});
				alert(string);
			}
		}
	}
	request.open("POST",url,true);
	request.send();
	
	
	var p=$('#PassChange').attr('value','');
	var np=$('#NPass').attr('value','');
	var p=$('#RNPass').attr('value','');
	
});

$('#PasswordInfo').live('click',function(){
	
    $('#MenuSelection').replaceWith(
		'<div id="MenuSelection"><h4>Change Password</h4>'+
    	'<div  class="MyAcInp">Current Password <input type="password" id="PassChange" class=" LV_invalid_field" ></div>'+
    	'<div  class="MyAcInp">New Password <input type="password" id="NPass"class=" LV_invalid_field" ></div>'+
    	'<div  class="MyAcInp">Re-Type New Password <input type="password" id="RNPass" class=" LV_invalid_field"  ></input></div>'+
    	'<div id="ChangePassword" class="MyAccButton">Change</div>'+
    	'</div>');

		reloadChangePassword();
});

$('#PreviousInfo').live('click',function(){
        $('#MenuSelection').replaceWith('<div id="MenuSelection"><h4>Previous Buyings information</h4></div>');

    });

$('#LastOrderInfo').live('click',function(){
        $('#MenuSelection').replaceWith('<div id="MenuSelection"><h4>Last Order Status</h4></div>');

    });

function modifyAccount(email,uname,fname,bir){
	
	
	
			var accHtml='<account>' +
					'<name>'+fname+'</name>' +
					'<email>'+email+'</email>' +
					'<birth_date>'+bir+'</birth_date>' +
					'</account>';

	url='./service/Security.groovy?method=UpdateAccount&username='+CurrentUsername+'&authentication_token='+CurrentToken+'&account='+accHtml;
	
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
				alert('You have modified your account succesfully.');
			} else if(stat == "fail"){
				var string = "";
				$(request.responseXML).find("error").each(function(){
					string += $(this).attr("message") + "\n";
				});
				alert(string);
			}
		}
	}
	request.open("POST",url,true);
	request.send();
}







function appendAdds(){
	

		var i=0;
				
				
		for( ;i<AddressList.getAdd().length;i++){
		
				var a=AddressList.addresses[i];
				
				var count=searchCountryByID(a.countryID);
				
				
				var stat=searchStateByID(a.countryID,a.stateID);
				
				var cant=i+1;
				
				
				$('#main').append(
		
					'<div id="AddOption2"><h5 lang="Addres ">Address Nº'+cant+'</h5></div>'+
					'<div id="address2"> Full Name: '+a.name+'</div>'+
					'<div id="address2"> Address: '+a.addline1+'</div>'+
					'<div id="address2"> Country: '+count.name+'</div>'+
					'<div id="address2"> State: '+stat.name+'</div>'+
					'<div id="address2"> City: '+a.city+'</div>'+
					'<div id="address2"> Zip code: '+a.zip_code+'</div>'+
					'<div id="address2"> Phone number:' +a.phone_number+'</div>'
					

				);
			}
		
		
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