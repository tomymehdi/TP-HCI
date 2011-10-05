$(document).ready( function() {	

	var opacity = 1, toOpacity = 0.5, duration = 2500;

	
	

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


	  $(function(){
	   $('.fadein1 div:gt(0)').hide();
	    setInterval(function(){
	      $('.fadein1 :first-child').fadeOut()
	         .next('div').fadeIn()
	         .end().appendTo('.fadein1');}, 
	      3000);
	    });	


       $(function(){
	   $('.fadein2 div:gt(0)').hide();
	    setInterval(function(){
	      $('.fadein2 :first-child').fadeOut()
	         .next('div').fadeIn()
	         .end().appendTo('.fadein2');}, 
	      3000);
	    });	
        
        
        
       $(function(){
	   $('.fadein3 div:gt(0)').hide();
	    setInterval(function(){
	      $('.fadein3 :first-child').fadeOut()
	         .next('div').fadeIn()
	         .end().appendTo('.fadein3');}, 
	      3000);
	    });	
        
        
		function initMenu() {
		  $('#menu ul').hide();
		  $('#menu ul:first').show();
		  $('#menu li a').live('click',
		    function() {
		      var checkElement = $(this).next();
		      if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
		        return false;
		        }
		      if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
		        $('#menu ul:visible').slideUp('normal');
		        checkElement.slideDown('normal');
		        return false;
		        }
		      }
		    );

		  }

  
	    $('.cds_link').live('click',function(){    
	    	$("#main").load("./html/articles.html #main");
			setTimeout("loadItems(cds, 0)", 100);
            initMenu();
	    });
	     
		$('.books_link').live('click',function(){    
			$("#main").load("./html/articles.html #main");
			setTimeout("loadItems(books, 0)", 100);
            initMenu();
		});

		$('.movies_link').live('click',function(){    
        
			$("#main").load("./html/articles.html #main");
            setTimeout("loadItems(movies, 0)", 100);
            initMenu();
		});

		
});

