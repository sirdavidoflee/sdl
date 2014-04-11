var SDL = {
    
/* Globals Variables
=============================================*/    
    scrollPos: $(window).scrollTop(),


/* Methods
=============================================*/    
    init: function(){
        
        $('.show-the-rest').click(function(){
            $(this).hide();
            $('.work-list').addClass('show-the-rest');
            $('body, html').animate({
                scrollTop: $(".work-list > li:nth-child(5)").offset().top - 130
            }, 500);
            
            return false;
        });
        
        $(window).scroll(function(){
            SDL.scrollPos = $(window).scrollTop();
            
            $('section section').each(function(){
                var $this = $(this);
                var thisTop = $this.offset().top;
                var thisHeight = $this.height();
                
                if(SDL.scrollPos < (thisTop + thisHeight) && SDL.scrollPos >= (thisTop - 30)){
                    $this.find('h2').addClass('current-section');
                } else{
                    $this.find('h2').removeClass('current-section');
                }
            });
        });
        
    	$('.work-list > li').hover(function(){
    		$(this).addClass('on');
    		if($(this).find('img').is(':animated')){
    			$(this).find('img').stop();
    		}
    		$(this).find('a img').animate({
    			opacity: '0.1'
    		}, 100);
    		$(this).find('h4').show();
    	}, function(){
    		$(this).removeClass('on');
    		if($(this).find('img').is(':animated')){
    			$(this).find('img').stop();
    		}
    		$(this).find('img').removeAttr('style');
    		$(this).find('h4').hide();
    	});
	
    	//Small gallery clicker stuff
    	$('.work-list > li > a').click(function(){
    		var href = $(this).attr('href');
    		$(this).siblings('.details').load(href, function(data) {
			
    			$('body').addClass('modal-on');

    			SDL.fixModal();
    			var theHtml = data;
    			var total = $(this).find('li').length;
    			$('.modal .modal-content').html(theHtml);
    			$('.modal .modal-content').prepend('<div class="nav"><a href="#" class="prev off">prev</a><span>Item <em>1</em> of <strong>'+ total + '</strong></span><a href="#" class="next">next</a>');
    			if(total==1){ $('.modal .nav a').hide(); $('.modal .nav span').addClass('off'); }
    			$('.modal-bg').fadeIn('medium');
    			$('.all-modal').fadeIn('medium');
    			$('.modal').fadeIn('medium', function() {
    				//animation complete
    				SDL.fixModal();
    			});
			
    		});
		
    		return false;
    	});
    	SDL.fixModal();
    	$(window).resize(function(){
    		SDL.fixModal();
    	});
	
    	$(document).on('click', '.modal .nav a', function(){
    		if($('.modal .modal-content li.current').is(':animated')){ return false; }
    		if($(this).hasClass('off')){ return false; }
    		$('.modal .nav a').removeClass('off');
    		spot = $('.modal em').html();
    		full = $('.modal strong').html();
    		if($(this).hasClass('prev')){
    			if(spot==1){ return false; }
    			$('.modal .modal-content li.current').fadeOut(500, function(){
    				$(this).prev().addClass('current').fadeIn(500);
    				$(this).removeClass('current');
    				$('.all-modal').animate({scrollTop:0}, 200);
    				spot--;
    				$('.modal em').html(spot);
    				if(spot==1){
    					$('.modal .nav a.prev').addClass('off');
    				}
    			});
    		} else{
    			// var oldHeight = $('.modal .modal-content li.current img').height();
    			// var newHeight = $('.modal .modal-content li.current').next().find('img').height();
    			// var finalHeight = oldHeight - newHeight;
    			// console.log(oldHeight + ' - ' + newHeight + ' = ' + finalHeight);
    			if(spot==full){ return false; }
    			$('.modal .modal-content li.current').animate({
    				height: '+='
    			})
    			$('.modal .modal-content li.current').fadeOut(500, function(){
    				$(this).next().addClass('current').fadeIn(500);
    				$(this).removeClass('current');
    				$('.all-modal').animate({scrollTop:0}, 200);
    				spot++;
    				$('.modal em').html(spot);
    				if(spot==full){
    					$('.modal .nav a.next').addClass('off');
    				}
    			});
    		}
    		return false;
    	});
	
    	$('.modal-bg, .button-close').click(function(){
    		//modalWork(true, true);
    		$('body').removeClass('modal-on');
    		$('.modal-bg, .modal').fadeOut('medium');
    		$('.all-modal').fadeOut();
    		return false;
    	});
    },
        
    fixModal: function() {
    	conHeight = $('#coastline').height();
    	winHeight = $(window).height();
    	winWidth = $('.all-modal').width();
    	modWidth = $('.modal > div.modal-content').width();
    	newX = (winWidth - modWidth) / 2;

    	if(conHeight > winHeight){ $('.modal-bg').css('height', conHeight+165); }
    	else { $('.modal-bg').css('height', winHeight); }
    }
};


$(function(){
    SDL.init();
});