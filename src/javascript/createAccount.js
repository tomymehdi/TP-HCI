$(document).ready( function() {	
	
	
	$('#Submit_register').click( function(){
       
		
		
		var username= $('#userNameBar').val();
		var name=$('#nameBar').val();
		var pass=$('#passBar').val();
		var email=$('#emailBar').val();
		var birth=$('#birthBar').val();
		
		createAccount(username,name,pass,email,birth);


    });
	

	
});


function createAccount(username,name,pass,email,birth){
	
			var accHtml='<account>' +
					'<username>'+username+'</username>' +
					'<name>'+name+'</name>' +
					'<password>'+pass+'</password>' +
					'<email>'+email+'</email>' +
					'<birth_date>'+birth+'</birth_date>' +
				'</account>';

	url='./service/Security.groovy?method=CreateAccount&account='+accHtml;
	
	var x,stat,xx;
	var request;
	if (window.XMLHttpRequest){
		request=new XMLHttpRequest();
	}else {
		request=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	request.onreadystatechange = function(){
		
		if(request.readyState==4 && request.status==200){
			
			
		/*	x=request.responseXML.documentElement.getElementsByTagName("response");
			xx=x[0];
			stat=xx.getAttribute("status")
		
			alert(stat);
			
			if(stat=="ok"){ */
				
				alert('You have completed your registration succesfully. Now you will be able to start buying.');
				
				$('#register_link').replaceWith('<div id="MyAccount_opt" class="item"><div id="text_MyAccount" class="text">MyAcc</div><div id="MyAccount"></div></div>');

			    $('#login_opt').replaceWith('<div id="Logout_opt" class="item"><div id="text_Logout" class="text">Logout</div><div id="logout"></div></div>');
				
					currentCategory=CategoriesList.categories[0];
					$("#main").load("./html/articles.html #main > *");

					reloadArticlesScript(currentCategory.name);
					reloadItemsManagerScript();

					setTimeout("loadItems(currentCategory, 1)", 100);
				
			

		}
	}
	request.open("POST",url,true);
	request.send();
}