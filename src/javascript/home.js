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
        
        
        

	    $('.cds_link').click(function(){
	          $("#main").load("./movies.html #main");
	          var ss = document.createElement('script');
				ss.type = 'text/javascript';
				ss.src = "../javascript/js.js";
				var hh = document.getElementsByTagName('head')[0];
				hh.appendChild(ss);
                
                  var ss = document.createElement('script');
				ss.type = 'text/javascript';
				ss.src = "../javascript/movies.js";
				var hh = document.getElementsByTagName('head')[0];
				hh.appendChild(ss);
	    });

		$('.books_link').click(function(){
		      $("#main").load("./movies.html #main");
		      var ss = document.createElement('script');
		      ss.type = 'text/javascript';
				ss.src = "../javascript/js.js";
				var hh = document.getElementsByTagName('head')[0];
				hh.appendChild(ss);
                
                  var ss = document.createElement('script');
				ss.type = 'text/javascript';
				ss.src = "../javascript/movies.js";
				var hh = document.getElementsByTagName('head')[0];
				hh.appendChild(ss);
		});

		$('.movies_link').click(function(){
		      $("#main").load("./movies.html #main");
				var ss = document.createElement('script');
				ss.type = 'text/javascript';
				ss.src = "../javascript/js.js";
				var hh = document.getElementsByTagName('head')[0];
				hh.appendChild(ss);
                
                var ss = document.createElement('script');
				ss.type = 'text/javascript';
				ss.src = "../javascript/movies.js";
				var hh = document.getElementsByTagName('head')[0];
				hh.appendChild(ss);
		});  

});