

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
		'<div  class="MyAcInp" >Name <input  id="FirstNameInput" type="text" disabled="disabled" ></input></div>'+
		'<div  class="MyAcInp" >Email <input id="EmailInput" type="text" disabled="disabled" ></input></div>'+
		'<div  class="MyAcInp" >Birth Date <input id="BirthInput" type="text" disabled="disabled" ></input></div>'+
		'<div id="Modify" class="MyAccButton">Modify</div>'+
		
    	 '</div>'); 

		getAccount();
});
    
$('#ShippingInfo').live('click',function(){
    $('#MenuSelection').replaceWith('<div id="MenuSelection"><h4>Shipping Information</h4></div>');
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
				CurrentUsername=uname;
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