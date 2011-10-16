$(document).ready( function() {

	setTimeout("chargeWishlistItems()", 500);
	
	$('#selCount').change(function() {
		
	});
	
	$('#removeAll').click(function() {
		$('*.OnCartItem').remove();
		while(cart.items.length > 0){
			cart.items.shift();
		}
		actualizeCart();
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
		$('#ListIt').append('<div id="OnCartItem' + i +'" class="OnCartItem">' +
			'<img id="ImageOnCart" class="pointer" onclick="bringInfo(' + 
			numEachItem[i] + ')" src="'  + itemsNoRepeat[i].imageSource + '"></img>' +
			'<div id="PriceNumberOnCart" >' + roundNumber(itemsNoRepeat[i].price*currentCoinType.value, 2) + '</div>' +
			'<div class="eachCount">' +
			'<button onclick="decrease(' + i + ', ' + itemsNoRepeat[i].number + ')"> &lt; </button>'+'' +
			'<div id="eachCountNumber' + i +'">'+ countEachItem[i]+'</div>'+
			'<button onclick="increase(' + i + ', ' + itemsNoRepeat[i].number + ')">&gt;</button></div>'+
			'<div id="totalItemOnCart">'  + roundNumber(countEachItem[i]*itemsNoRepeat[i].price*currentCoinType.value, 2) + '</div>' +
			'<button id="removeItem" onclick="removeItem('+ i + ', ' + itemsNoRepeat[i].number + ')"/>' +
			'</div>');
	}
}

function decrease(i, target_id){
	if(parseInt($('#eachCountNumber' + i)) == 0){
		alert("El prod " + i + " es 0!!  o sea es " + $('#eachCountNumber' + i));
		return;
	}
	flag = false;
	var item;
	while(!flag){
		item = cart.items.shift();
		if(item.number == target_id){
			previousNumber = parseInt($('#eachCountNumber' + i ).text());
			$('#eachCountNumber' + i ).empty();
			$('#eachCountNumber' + i ).append("" + (previousNumber-1));
			actualizeCart();
			if(previousNumber == 1){
				$('#OnCartItem' + i).remove();
			}
			return;
		}
		cart.items.push(item);
	}
}

function increase(i, target_id){
	flag = false;
	var item;
	while(!flag){
		item = cart.items.shift();
		if(item.number == target_id){
			previousNumber = parseInt($('#eachCountNumber' + i ).text());
			$('#eachCountNumber' + i ).empty();
			$('#eachCountNumber' + i ).append("" + (previousNumber+1));
			cart.items.push(item);
			cart.items.push(item);
			actualizeCart();
			return;
		}
		cart.items.push(item);
	}
}

function removeItem(listNumber, target_id){
	var i = 0;
	var len = cart.items.length;
	while(i < len){
		item = cart.items.shift();
		if(item.number != target_id){
			cart.items.push(item);
		}
		i++;
	}
	actualizeCart();
	$('#OnCartItem' + listNumber).remove();
}