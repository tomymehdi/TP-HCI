$('#Modify').live('click',function(){
    $('.MyAcInp :input').removeAttr('disabled');
    $('#Modify').replaceWith('<div id="Save" class="MyAccButton">Save</div>');
});
    
$('#Save').live('click',function(){
    $('.MyAcInp :input').attr('disabled', true);
    $('#Save').replaceWith('<div id="Modify" class="MyAccButton">Modify</div>');
});
    
$('#PersonalInfo').live('click',function(){
     $('#MenuSelection').replaceWith('<div id="MenuSelection">'+
    	 '<h4>Personal Information</h4>' +
    	 '<div id="FirstNameInput" class="MyAcInp">First Name <input type="text" disabled="disabled" ></input></div>'+
    	 '<div id="LastNameInput" class="MyAcInp"> Last Name <input type="text" disabled="disabled" ></input></div>'+
    	 '<div id="EmailInput"class="MyAcInp">Email <input type="text" disabled="disabled" ></input></div>'+
    	 '<div id="Modify" class="MyAccButton">Modify</div>'+
    	 '</div>'); 
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

