$(document).ready( function() {

	setTimeout("chargeCartItems()", 500);
	
});

function chargeCartItems(){
	var cartItems = cart.getItems();
	var cant = cart.getItemCount();
	var itemsNoRepeat = new Array();
	var countEachItem = new Array();
	var flag = true;
	$('#ListIt').empty();
	for(var i = 0; i < cant ; i++){
		flag = true;
		for(var j = 0; j < itemsNoRepeat.length ; j++){
			if(itemsNoRepeat[j] == cartItems[i]){
				flag = false;
			}
		}
		if(flag){
			itemsNoRepeat.push(cartItems[i]);
		}
	}
	for(var i = 0 ; i < cant ; i++){
		for(var j = 0; j < itemsNoRepeat.length ; j++){
			if(cartItems[i] == itemsNoRepeat[j]){
				countEachItem[j]++;
			}
		}
	}
	
		$('#ListIt').append('<div id="OnCartItem">' +
			'<div id="OnCartItemItemName" onclick="bringInfo(' + i + ')" class="pointer">' 
			+ roundString(item.name, 25) + 
			'</div><img id="OnCartItemImage" class="pointer" onclick="bringInfo(' + 
			i + ')" src="'  + item.imageSource + '"></img>' +
			'<select id="sel' + i + '" size="1" class="quantity"> ' +
			currentCoinType + '</div>' +
			'<div id="PriceNumber" >' + roundNumber(item.price*currentCoinType.value, 2) + '</div>' +
			'</div></div>' +
			'</div>');
}
