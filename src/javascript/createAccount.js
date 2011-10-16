$(document).ready( function() {	
	
	
	$('#Submit_register').click( function(){
       
		
		
		var username= $('#userNameBar').val();
		var name=$('#nameBar').val();
		var pass=$('#passBar').val();
		var email=$('#rmailBar').val();
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
	
	var request;
	if (window.XMLHttpRequest){
		request=new XMLHttpRequest();
	}else {
		request=new ActiveXObject("Microsoft.XMLHTTP");
	}
	request.onreadystatechange = function(){
		if(request.readyState==4 && request.status==200){
			
			alert(request.responseXML.documentElement.getElementsByTagName("response"));

		}
	}
	request.open("POST",url,true);
	request.send();
}