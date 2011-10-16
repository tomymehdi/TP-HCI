

$('#Modify').live('click',function(){
    $('.MyAcInp :input').removeAttr('disabled');
    $('#Modify').replaceWith('<div id="Save" class="MyAccButton">Save</div>');
});
    
$('#Save').live('click',function(){
	
    $('.MyAcInp :input').attr('disabled', true);
    $('#Save').replaceWith('<div id="Modify" class="MyAccButton">Modify</div>');
	modifyAccount(	$('#EmailInput').attr('value') , $('#UserNameInput').attr('value'),$('#FirstNameInput').attr('value'),$('#BirthInput').attr('value'));
	

});
    
$('#PersonalInfo').live('click',function(){
    
 		$('#MenuSelection').replaceWith('<div id="MenuSelection">'+
    	 '<h4>Personal Information</h4>' +
		'<div  class="MyAcInp">User Name <input id="UserNameInput" type="text" disabled="disabled" ></input></div>'+
		'<div  class="MyAcInp" > Last Name <input  id="FirstNameInput"type="text" disabled="disabled" ></input></div>'+
		'<div  class="MyAcInp" >Email <input id="EmailInput" type="text" disabled="disabled" ></input></div>'+
		'<div  class="MyAcInp" >Birth Date <input id="BirthInput" type="text" disabled="disabled" ></input></div>'+
		'<div id="Modify" class="MyAccButton">Modify</div>'+
		
    	 '</div>'); 

		getAccount();
});
    
$('#ShippingInfo').live('click',function(){
    $('#MenuSelection').replaceWith('<div id="MenuSelection"><h4>Shipping Information</h4></div>');
});
    
$('#PasswordInfo').live('click',function(){
    $('#MenuSelection').replaceWith('<div id="MenuSelection"><h4>Change Password</h4>'+
    	'<div id="PassChange" class="MyAcInp">Current Password <input type="text" disabled="disabled" ></div>'+
    	'<div id="NPass" class="MyAcInp">New Password <input type="text" disabled="disabled" ></div>'+
    	'<div id="RNPass" class="MyAcInp">Re-Type New Password <input type="text" disabled="disabled" ></input></div>'+
    	'<div id="Modify" class="MyAccButton">Modify</div>'+
    	'</div>');
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