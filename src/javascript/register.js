$('#login_option').click( function(){
	$(this).animate({
		opacity: 1,
	}, 400 );	
	if($('#login_data2').is(":hidden")){
		$('#login_data2').slideDown();
	} else{
		$('#login_data2').slideUp();
	}
});
	
$('#login_button2').live('click', function(){
	
		$('#login_data2').slideUp();
		$('#login_data').slideUp();
      	
		var u= $('#login_user_input').val();
		var pa= document.getElementById("login_pass_input").value;
		login(u,pa);
		
		setTimeout('',6000);
	
		//LO MANDO AL DVD
		currentCategory=CategoriesList.categories[0];
		$("#main").load("./html/articles.html #main > *");
		
		reloadArticlesScript(currentCategory.name);
		reloadItemsManagerScript();
		setTimeout("loadItems(currentCategory, 1)", 100);
		//
		
	
		if(!($('#login_data').is("hidden"))){
		$('#login_data').slideUp();
		}
	
			
});



$(function(){
	var nameBar = new LiveValidation( "nameBar", { validMessage: "Ok!", wait: 500 } );		
	nameBar.add( Validate.Presence, { failureMessage: "Please, enter your name" } );
});


$(function(){
	var lastnameBar = new LiveValidation( "lastnameBar", { validMessage: "Ok!", wait: 500 } );	
	lastnameBar.add( Validate.Presence, { failureMessage: "Please, enter your last name" } );
});
$(function(){
	var userNameBar = new LiveValidation( "userNameBar", { validMessage: "Ok!", wait: 500 } );	
	userNameBar.add( Validate.Presence, { failureMessage: "Please, enter your last name" } );
});


$(function(){
	var emailBar = new LiveValidation( "emailBar", { validMessage: "Ok!", wait: 500 } );	
	emailBar.add( Validate.Presence, { failureMessage: "Please, enter your e-mail" } );
	emailBar.add( Validate.Email );
});


$(function(){
	var birthBar = new LiveValidation( "birthBar", { validMessage: "Ok!", wait: 500 } );	
	birthBar.add( Validate.Presence, { failureMessage: "Please, enter your birthay like: aaaa-mm-dd" } );	
});


$(function(){
	var rmailBar = new LiveValidation( "rmailBar", { validMessage: "Ok!", wait: 500 } );	
	rmailBar.add( Validate.Presence, { failureMessage: "Please, re-type your e-mail" } );
	rmailBar.add( Validate.Email );
	rmailBar.add( Validate.Confirmation, { match: 'emailBar' } );
});

$(function(){
	var passBar = new LiveValidation( "passBar", { validMessage: "Ok!", wait: 500 } );	
	passBar.add( Validate.Presence, { failureMessage: "Please, enter your password" } );
	passBar.add( Validate.Length, { minimum: 6, maximum: 10 } );
});

$(function(){
	var rpassBar = new LiveValidation( "rpassBar", { validMessage: "Ok!", wait: 500 } );	
	rpassBar.add( Validate.Presence, { failureMessage: "Please, enter your password" } );
	rpassBar.add( Validate.Length, { minimum: 4, maximum: 8 } );
	rpassBar.add( Validate.Confirmation, { match: 'passBar' } );
});	



