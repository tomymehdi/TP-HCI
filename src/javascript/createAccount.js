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
	
	var stat;
	var request;
	if (window.XMLHttpRequest){
		request=new XMLHttpRequest();
	}else {
		request=new ActiveXObject("Microsoft.XMLHTTP");
	}
	request.onreadystatechange = function(){
		if(request.readyState==4 && request.status==200){
			stat=$(request.responseXML).find("response").attr("status");
			if(stat=="ok"){ 
				login(username,pass);
				alert('You have completed your registration succesfully. Now you will be able to start buying.');
				currentCategory=CategoriesList.categories[0];
				$("#main").load("./html/articles.html #main > *");
				reloadArticlesScript(currentCategory.name);
				reloadItemsManagerScript();
				setTimeout("loadItems(currentCategory, 1)", 100);
			} else if(stat=="fail"){
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