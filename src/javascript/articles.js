
$(document).ready(function() {
	
	
	
	$('#pageSize').change(function() {
		loadItems(currentCategory, 1);
	});
	
	$('#sort').change(function() {
		
		loadItems(currentCategory,1);
	});



});



