$(function(){
	var PassChange = new LiveValidation( "PassChange", { validMessage: "Ok!", wait: 500 } );	
	PassChange.add( Validate.Presence, { failureMessage: "Please, enter your password" } );
	PassChange.add( Validate.Length, { minimum: 6, maximum: 10 } );
});
