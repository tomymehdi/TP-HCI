$(document).ready( function() {

	setTimeout("chargeWishlistItems()", 500);
	
	$('#selCount').change(function() {
		
	});
	
});

function chargeWishlistItems(){
	var cartItems = cart.getItems();
	var cant = cart.getItemCount();
	var itemsNoRepeat = new Array();
	var countEachItem = new Array();
	var numEachItem = new Array();
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
	
	for(var i = 0 ; i < itemsNoRepeat.length ; i++){
		countEachItem[i] = 0;
	}
	
	for(var i = 0 ; i < cant ; i++){
		for(var j = 0; j < itemsNoRepeat.length ; j++){
			if(cartItems[i] == itemsNoRepeat[j]){
				countEachItem[j]++;
			}
		}
	}
	
	for(var i = 0 ; i < partialList.items.length ; i++){
		for(var j = 0 ; j < itemsNoRepeat.length ; j++){
			if(partialList.items[i] == itemsNoRepeat[j]){
				numEachItem[j] = i;
			}
		}
	}
	
	for(var i = 0 ; i < itemsNoRepeat.length ; i++){
		$('#ListIt').append('<div id="OnCartItem">' +
			'<img id="ImageOnCart" class="pointer" onclick="bringInfo(' + 
			numEachItem[i] + ')" src="'  + itemsNoRepeat[i].imageSource + '"></img>' +
			'<div id="PriceNumberOnCart" >' + roundNumber(itemsNoRepeat[i].price*currentCoinType.value, 2) + '</div>' +
			'<select id="selCount" size="1" class="quantity"> <option selected="selected">'+ countEachItem[i]+' </option> <option>1 </option> <option>2 </option> <option>3 </option><option>4 </option><option>5 </option><option>6 </option><option>7 </option><option>8 </option><option>9</option></select>' +
			'<div id="totalItemOnCart">'  + roundNumber(countEachItem[i]*itemsNoRepeat[i].price*currentCoinType.value, 2) + '</div>' +
			'<div id="removeItem" href="#"/>' +
			'</div>');
	}
}
