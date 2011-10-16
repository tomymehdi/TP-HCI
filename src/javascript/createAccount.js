function createAccount(){
			var accHtml='<account>' +
					'<username>hci</username>' +
					'<name>HCI 2009</name>' +
					'<password>itba1234</password>' +
					'<email>hci@it.itba.edu.ar</email>' +
					'<birth_date>2009-08-18</birth_date>' +
				'</account>';

	url='./service/Security.groovy?method=CreateAccount&account=' + accHtml;
	
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