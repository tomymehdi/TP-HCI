$(document).ready( function() {

	setTimeout("chargeWishlistItems()", 500);
	
});

function chargeWishlistItems(){
	var wishlistItems = wishlist.getItems();
	var cant = wishlist.getItemCount();
	var itemsNoRepeat = new Array();
	var countEachItem = new Array();
	var numEachItem = new Array();
	var flag = true;
	$('#ListIt').empty();
	for(var i = 0; i < cant ; i++){
		flag = true;
		for(var j = 0; j < itemsNoRepeat.length ; j++){
			if(itemsNoRepeat[j] == wishlistItems[i]){
				flag = false;
			}
		}
		if(flag){
			itemsNoRepeat.push(wishlistItems[i]);
		}
	}
	
	for(var i = 0 ; i < itemsNoRepeat.length ; i++){
		countEachItem[i] = 0;
	}
	
	for(var i = 0 ; i < cant ; i++){
		for(var j = 0; j < itemsNoRepeat.length ; j++){
			if(wishlistItems[i] == itemsNoRepeat[j]){
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
		$('#ListIt').append('<div id="OnWishlistItem' + i +'" class="OnWishlistItem">' +
			'<img id="ImageOnWishlist" class="pointer" onclick="bringInfo(' + 
			numEachItem[i] + ')" src="'  + itemsNoRepeat[i].imageSource + '"></img>' +
			'<div id="PriceNumberOnWishlist" >' + roundNumber(itemsNoRepeat[i].price*currentCoinType.value, 2) + '</div>' +
			'<div class="eachCountW">' +
			'<button id="dec" onclick="decrease(' + i + ', ' + itemsNoRepeat[i].number + ')"> &lt; </button>'+'' +
			'<div id="eachCountNumber' + i +'" class="eachCountNumberWishList">'+ countEachItem[i]+'</div>'+
			'<button onclick="increase(' + i + ', ' + itemsNoRepeat[i].number + ')">&gt;</button></div>'+
			'<button id="removeItemW" onclick="removeItem('+ i + ', ' + itemsNoRepeat[i].number + ')"/>' +
			'<button id="buyButtonOnWishlist" onclick="buyItem(' + i +')" class="buyButton"></button>' +
			'</div>');
	}
	actualizeCount();
}

function actualizeCount(){
	$("#itemOnWishlistCount").empty();
	$("#itemOnWishlistCount").text('You have '+wishlist.items.length+' items');
}

function decrease(i, target_id){
	if(parseInt($('#eachCountNumber' + i)) == 0){
		alert("El prod " + i + " es 0!!  o sea es " + $('#eachCountNumber' + i));
		return;
	}
	flag = false;
	var item;
	while(!flag){
		item = wishlist.items.shift();
		if(item.number == target_id){
			previousNumber = parseInt($('#eachCountNumber' + i ).text());
			$('#eachCountNumber' + i ).empty();
			$('#eachCountNumber' + i ).append("" + (previousNumber-1));
			actualizeWishlist();
			actualizeCount();
			if(previousNumber == 1){
				$('#OnWishlistItem' + i).remove();
			}
			return;
		}
		wishlist.items.push(item);
	}
}

function increase(i, target_id){
	flag = false;
	var item;
	while(!flag){
		item = wishlist.items.shift();
		if(item.number == target_id){
			previousNumber = parseInt($('#eachCountNumber' + i ).text());
			$('#eachCountNumber' + i ).empty();
			$('#eachCountNumber' + i ).append("" + (previousNumber+1));
			wishlist.items.push(item);
			wishlist.items.push(item);
			actualizeWishlist();
			actualizeCount();
			return;
		}
		wishlist.items.push(item);
	}
}

function removeItem(listNumber, target_id){
	var i = 0;
	var len = wishlist.items.length;
	while(i < len){
		item = wishlist.items.shift();
		if(item.number != target_id){
			wishlist.items.push(item);
		}
		i++;
	}
	actualizeWishlist();
	actualizeCount();
	$('#OnWishlistItem' + listNumber).remove();
}