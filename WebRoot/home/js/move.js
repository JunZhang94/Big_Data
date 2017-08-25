$(function(){
		
		var $window = $(window),
		window_width = $window.width();
		window_height = $window.height();
		
        var num=$(".pcells").length + 1;
		//var num = 7;
		
	    $(".screen").width(window_width);
        $(".lscreen").width(window_width*num);
		
		var nowstep = 0;  
		
		
		//���Ұ�ť
		
		$(".banner_next").click(function(){
		  
			  if(nowstep<(num-1)){
				  
				 ++nowstep;
				 if (title != '') {
					 $("#nbtn1" + (nowstep + 1)).prev().find(".test").stop().animate({'top':	'-90px'}, 300); // move down - hide
					 $("#nbtn1" + (nowstep + 1)).find(".test").stop().animate({'top':	'0px'}, 0); // move down - show
				 } else {
					 $("#nbtn" + nowstep).prev().find(".test").stop().animate({'top':	'-90px'}, 300); // move down - hide
					 $("#nbtn" + nowstep).find(".test").stop().animate({'top':	'0px'}, 0); // move down - show
				 }
			  
			     $(".lscreen").animate({left: "-"+window_width*nowstep+"px"}, "slow");
			       
			  }
		});
		
		$(".banner_pre").click(function(){
		
			  if(nowstep>0){
 
				 --nowstep;
				 if (title != '') {
					 $("#nbtn1" + (nowstep + 1)).next().find(".test").stop().animate({'top':	'-90px'}, 300); // move down - hide
					 $("#nbtn1" + (nowstep + 1)).find(".test").stop().animate({'top':	'0px'}, 0); // move down - show
				 } else {
					 $("#nbtn" + nowstep).next().find(".test").stop().animate({'top':	'-90px'}, 300); // move down - hide
					 $("#nbtn" + nowstep).find(".test").stop().animate({'top':	'0px'}, 0); // move down - show
				 }
			
				$(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

			  }
		});
		
		$("#menu2 li a").click(function(){
			$(".over",	this).stop().animate({'top':	'-50px'}, 0); // move down - show
			$("#menu2 li a").each(function() {
				 $(".test",	this).stop().animate({'top':	'-90px'}, 300); // move down - hide
		    });
			$(this).find(".test").stop().animate({'top':	'0px'}, 0); // move down - show
		});
		
		$("#nbtn0").click(function(){
			
		    showscreen();
		    nowstep = 0
 		    $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");
		});

		$("#nbtn1").click(function(){
			
		    showscreen();
		    nowstep = 1
 		    $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});

		$("#nbtn2").click(function(){
		
		    showscreen();
		    nowstep = 2
		    $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});
		
		$("#nbtn3").click(function(){
		
		   showscreen();
		   nowstep = 3
		   $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});
		
		$("#nbtn4").click(function(){
		
		   showscreen();
		   nowstep = 4
		   $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});
		$("#nbtn5").click(function(){
		
		   showscreen();
		   nowstep = 5
		   $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});

		$("#nbtn6").click(function(){
		
		   showscreen();
		   nowstep = 6
		   $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});

		$("#nbtn10").click(function(){
			$(".over",	this).stop().animate({'top':	'-50px'}, 0); // move down - show
			$("#menu2 li a").each(function() {
				 $(".test",	this).stop().animate({'top':	'-90px'}, 300); // move down - hide
		    });
			$(this).find(".test").stop().animate({'top':	'0px'}, 0); // move down - show
			currentPages();
		});
		
		$("#nbtn11").click(function(){
			
		    showscreen();
		    nowstep = 0
 		    $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});

		$("#nbtn12").click(function(){
		
		    showscreen();
		    nowstep = 1
		    $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});
		
		$("#nbtn13").click(function(){
		
		   showscreen();
		
		   nowstep = 2
		   $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});
		
		$("#nbtn14").click(function(){
		
		   showscreen();
		
		   nowstep = 3
		   $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});
		$("#nbtn15").click(function(){
		
		   showscreen();
		
		   nowstep = 4
		   $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});

		$("#nbtn16").click(function(){
		
		   showscreen();
		
		   nowstep = 5
		   $(".lscreen").animate({left:"-"+window_width*nowstep+"px"}, "slow");

		});


		/*$(".pcell").click(function(){
		
		
		 showframe();
		  
		
		
		});*/
		
		
	
	
	
	   function showframe(){
		  
		  
		  $(".lscreen").hide();
		  $(".banner_pre").hide();
		  $(".banner_next").hide();
		  
		  
		  //$(".framescreen").show();
		    
       }
	   
	   function showscreen(){
		  $(".frame").show();
		  //$(".framescreen").hide();
		  $("#mainGrid").hide();
		  $(".screen").show();
		  $(".bottom").show();
		  
		  $(".lscreen").show();
		  $(".banner_pre").show();
		  $(".banner_next").show();
		  
       }
		

      	
})