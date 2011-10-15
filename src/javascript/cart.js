function chargeCartItems(){
	var items = new Array();
	$('#ListIt').empty();
	for(var i = 0; i < cart.getItemCount() ; i++){
		var flag = true;
		for(var j = 0; flag && j < cart.getItemCount() ; j++){
			if(items[j] == cart.getItems[j].name){
				flag = false;
			}
		}
		$('#ListIt').append('<div id="OnCartItem">' +
			'<div id="itemName" onclick="bringInfo(' + i + ')" class="pointer">' 
			+ roundString(item.name, 25) + 
			'</div><img id="Image" class="pointer" onclick="bringInfo(' + 
			i + ')" src="'  + item.imageSource + '"></img>' +
			'<div id="Options">' +
			'<select id="sel' + i + '" size="1" class="quantity"> ' +
			currentCoinType + '</div><div id="PriceNumber" >' + roundNumber(item.price*currentCoinType.value, 2) + 
			'</div></div></div>' +
			'</div>');}
}
