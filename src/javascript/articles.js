
$(document).ready(function() {
	
	
	
	$('#pageSize').change(function() {
		setTimeout("loadItems(currentCategory, 1)", 100);
	});
	
	$('#sort').change(function() {
		setTimeout("loadItems(currentCategory, 1)", 100);
	});

		$('#prev').click(function(){
		if(currentPage != 1){
			$('#pageNumber').remove();
			$('#Items').empty();
			setTimeout("loadItems(currentCategory, parseInt(currentPage - 1))", 100);
		}
	});

	$('#next').click(function(){
		if(currentPage != getMaxPage()){
			$('#pageNumber').remove();
			$('#Items').empty();
			setTimeout("loadItems(currentCategory, parseInt(currentPage + 1))", 100);
		}
	});


});



