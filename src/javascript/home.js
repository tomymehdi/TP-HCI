$(document).ready( function() {	
	
	
	var opacity = 1;
	var toOpacity = 0.5;
	var duration = 2500;
	
	currentCoinType = dollars;
	

    $("#main").load("./html/home.html #main > *");   

   	setTimeout("appendCats()",500);
	
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


function appendCats(){    

	var j=0;
	var cate;

	if(document.getElementById("main_opt")){
	}
	else{
		
		$('#FooterCat').empty(); 
		
		while(j < CategoriesList.categories.length){
			cate = CategoriesList.categories[j];
		    $('#main').append('<div id="main_opt"><div  class="'+cate.name+'_link  title" >'+cate.name+'</div>');
		    $('#FooterCat').append('<li><a  class="'+cate.name+'_link pointer">'+cate.name+'</a></li>');
			j++;

			}
	
	} 
}

