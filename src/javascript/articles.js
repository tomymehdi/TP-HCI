
$(document).ready(function() {
	
	
	$('#pageSize').change(function() {
		setTimeout("loadItems(currentCategory, 1)", 100);
	});
	
	$('#sort').change(function() {
		setTimeout("loadItems(currentCategory, 1)", 100);
	});

});



