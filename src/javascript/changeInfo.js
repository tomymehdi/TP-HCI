$(document).ready( function() {

$(function(){
	var BirthInput = new LiveValidation( "BirthInput", { validMessage: "Ok!", wait: 500 } );	
	BirthInput.add( Validate.Presence, { failureMessage: "Please, enter your birthay like: aaaa-mm-dd" } );	
});
$(function(){
	var FirstNameInput = new LiveValidation( "FirstNameInput", { validMessage: "Ok!", wait: 500 } );		
	FirstNameInput.add( Validate.Presence, { failureMessage: "Please, enter your name" } );
});
$(function(){
	var EmailInput = new LiveValidation( "EmailInput", { validMessage: "Ok!", wait: 500 } );	
	EmailInput.add( Validate.Presence, { failureMessage: "Please, enter your e-mail" } );
	EmailInput.add( Validate.Email );
});

});	
