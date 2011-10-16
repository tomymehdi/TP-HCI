$(document).ready( function() {	
	
	
	var opacity = 1;
	var toOpacity = 0.5;
	var duration = 2500;
	
	currentCoinType = dollars;

    $("#main").load("./html/home.html #main > *");   

   	setTimeout("appendCats(0)", 100);
	
	setTimeout("reloadhomeFunc()",2000);
	

	$('.main_opt').css('opacity',opacity).hover(function() {
	      $(this).animate({
				opacity: toOpacity,
			}, 400 );
	    }, function() {
	      $(this).animate({
				opacity: opacity,
			}, 100 );
	    }
	);
});


function appendCats(seconds){
	if(CategoriesList.categories.length == 0){
		if(seconds == 10){
			alert("The connection with our server is slow or is not connected at all. Please check our your internet connection.");
		}
		newSeconds = seconds+1;
		setTimeout("appendCats(newSeconds)", 1000);
		return;
	}

	var j=0;
	var cate;

//	if(document.getElementById("main_opt")){
//	}
//	else{
		
		$('#FooterCat').empty(); 
		$('#main_opt').remove();
		while(j < CategoriesList.categories.length){
			cate = CategoriesList.categories[j];
		    $('#main').append('<div class="main_opt"><div  class="'+cate.name+'_link  title pointer" >'+cate.name+'</div>');
		    $('#FooterCat').append('<li><a  class="'+cate.name+'_link pointer">'+cate.name+'</a></li>');
			j++;
			}
//	} 
}

$(function(){
	$('.fadein1 div:gt(0)').hide();
	setInterval(function(){
	$('.fadein1 :first-child').fadeOut().next('div').fadeIn().end().appendTo('.fadein1');},
	3000);
}); 