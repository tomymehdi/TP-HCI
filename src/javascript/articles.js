$(document).ready(function() {
	
	$('#pageSize').change(function() {
		loadItems(currentCategory, 1)
	});
	
	$('#sort').change(function() {
		loadItems(currentCategory, 1)
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



