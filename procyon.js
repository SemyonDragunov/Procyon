/*
 * Procyon v0 (http://procyon.sl-7.ru)
 * Copyright SL7 (http://sl-7.ru)
 * Licensed under GNU GPL v2
 */

(function ($) {
    
    $(document).ready(function () {
	
	var $window = $(window);
	
	function winWidth() {
	    var winWidthVal = $window.width();
	    return winWidthVal;
	}
	$window.resize(winWidth);
	
	function winHeight() {
	    var winHeightVal = $window.height();
	    return winHeightVal;
	}
	$window.resize(winHeight);
	
        // Spoiler
        
        $('.spoiler-head').bind('click', function() {
            $(this).toggleClass('open').next().slideToggle();
        });
        
        // Messages
        
        $('div.messages').prepend('<span class="close"></span>');
        
        $('span.close').bind('click', function() {
            $(this).parent().fadeOut(500);
        });
	
        // Modal window in HTML
        
        $('[data-modal]').wrap('<div class="modal-bg"></div>');
        
        $('[data-modal-id]').bind('click', function() {
            var modalId = $(this).data('modal-id');
            
            if ($('.modal-bg.open').length) {
                $('[data-modal]').hide();
                $('.modal-bg').removeClass('open').hide();
            }
            
            $('#' + modalId).slideToggle().parent().toggleClass('open').fadeIn(500);
            $('body').addClass('modal-open');
            
            $(document).keyup(function(d) {
		if (d.keyCode == 27) {
		    $('[data-modal]').hide();
                    $('.modal-bg').removeClass('open').fadeOut(500);
                    $('body').removeClass('modal-open');
		}
	    });
        });
        
        $('[data-modal-close]').bind('click', function() {
            $('[data-modal]').hide();
            $('.modal-bg').removeClass('open').fadeOut(500);
            $('body').removeClass('modal-open');
	    return false;
        });
        
	$('.modal-bg').bind('click', function(event) {
	    if ($(event.target).closest('[data-modal]').length) return;
	    $('[data-modal]').hide();
            $('.modal-bg').removeClass('open').fadeOut(500);
            $('body').removeClass('modal-open');
	    event.stopPropagation();
	});
	
	// Sticky topbar
	
	var $stickyBar = $('.topbar.sticky'),
	    startPos = $stickyBar.offset().top;
	
	$window.scroll(function() {
	    if (!$stickyBar.hasClass('fixed-top') && ($window.scrollTop() > startPos)) {
		$stickyBar.addClass('fixed-top');
	    }
	    else if ($stickyBar.hasClass('fixed-top') && ($window.scrollTop() < startPos)) {
		$stickyBar.removeClass('fixed-top');
	    }
        });
	
	// Topbar mobile

	var nameBack = '<<<<<<<',
	    mobileWidth = 991,
	    heightTopMenu = 50;
	
	$window.resize(function() {
	    if (winWidth() > mobileWidth) {
		$('.topbar.open').css('height', '').removeClass('open');
		$('.topbar').css('overflow-y', 'visible');
	    } else {
		$('.topbar').css('overflow-y', 'hidden');
	    }
	});
	
	$('.topbar li.dropdown > ul').prepend('<li class="back">' + nameBack + '</li>');
	
	$('.topbar li.dropdown > a').addClass('no-click');
	
	$('.topbar .toggle').bind('click', function() {
	    var $topbar = $(this).closest('.topbar');
	    
	    $topbar.toggleClass('open').css('height', '').find('li.dropdown.open').removeClass('open');
	    
	    if ($topbar.is('.fixed-top')) {
		var fixedMenu = true;
	    }
	    
	    if ($topbar.outerHeight() > winHeight() && fixedMenu) {
		$topbar.css({'bottom' : '0' , 'overflow-y' : 'scroll'});
	    } else {
		$topbar.css({'bottom' : '' , 'overflow-y' : 'hidden'});
	    }
	});
	
	$('.topbar input:not([type="submit"])').bind('click', function() {
	    return false;
	});
	
	$('.topbar li:not(.dropdown, .toggle, .back)').bind('click', function() {
	    $(this).closest('.topbar').css('height', '').removeClass('open').find('li.dropdown.open').removeClass('open');
	});
	
	$('.topbar li.dropdown > a').bind('click', function(e) {   
	    if (winWidth() <= mobileWidth) {
		var $topbar = $(this).closest('.topbar');
		var heightMenu = $(this).parent('li.dropdown').children('ul').outerHeight() + heightTopMenu;
		
		$(this).parent('li.dropdown').toggleClass('open');
		$topbar.css('height', heightMenu);
		
		if (winHeight() < heightMenu) {
		    $topbar.css({'bottom' : '0' , 'overflow-y' : 'scroll'});
		} else {
		    $topbar.css({'bottom' : '' , 'overflow-y' : 'hidden'});
		}
	    }
	    
	    if (window.location.hash) {
		e.preventDefault();
	    }
	    
	    e.preventDefault();
	});
	
	$('.topbar .back').bind('click', function() {
	    var $topbar = $(this).closest('.topbar');
	    var heightMenu = $(this).parent('ul').parent('li.dropdown').parent('ul').outerHeight() + heightTopMenu;
	    
	    if (winWidth() <= mobileWidth) {
		$(this).parent('ul').parent('li.dropdown').removeClass('open').find('.open').removeClass('open');
		
		if (winHeight() < heightMenu) {
		    $topbar.css({'bottom' : '0' , 'overflow-y' : 'scroll'});
		} else {
		    $topbar.css({'bottom' : '' , 'overflow-y' : 'hidden'});
		}
	    }
	    
	    if ($(this).closest('li.dropdown').parent('ul').parent('li.dropdown').length) {
		$topbar.css('height', heightMenu);
	    } else {
		$topbar.css('height', '');
	    }
	});
	
        // Mobyle bar
        
        $('[data-topbar] > .toggle').bind('click', function() {
            if ($('.mobilebar-open').length) {
                $('[data-wrapper]').removeClass('mobilebar-open');
            } else {
                $('[data-wrapper]').addClass('mobilebar-open');
            }
        });
	
	// Menu to anchor
        
        var lastId,
            topMenu = $('nav'),
            topMenuHeight = topMenu.outerHeight() + 15,
            menuItems = topMenu.find('a:not(.no-click)'),
            scrollItems = menuItems.map(function(){
                var item = $($(this).attr('href'));
                if (item.length) { return item; }
            });


        /*menuItems.click(function(e) {
            var href = $(this).attr('href'),
                offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 1000, 'swing');
            e.preventDefault();
        });*/
	
	$('a[href*="#"]:not(.no-click)').bind('click', function() {
	    var href = $(this).attr('href'),
                offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 1000, 'swing');
            e.preventDefault();
	});

        $window.scroll(function() {
            var fromTop = $(this).scrollTop()+topMenuHeight;

            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                    return this;
            });
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                menuItems
                    .removeClass('active').parent().removeClass('active')
		    //.parents('li.dropdown').removeClass('active').children('a.no-click').removeClass('active')
                    .end().filter('[href=#'+id+']').addClass('active').parent().addClass('active')
		    //.parents('li.dropdown').addClass('active').children('a.no-click').addClass('active');
            }
        });
	
    });
    
})(jQuery);

// Modal window API

(function ($, window, document, undefined) {
    
    jQuery.fn.modal = function(options){
        
    options = $.extend({
      keyboard: true,
    }, options);
    
    var make = function(){
        
        if ($(this).parent().hasClass('open')) {
            $(this).slideToggle().parent().toggleClass('open').hide();
            $('body').removeClass('modal-open');
        } else {
            if ($('.modal-bg.open').length) {
                $('[data-modal]').hide();
                $('.modal-bg').removeClass('open').hide();
            }
            
            $(this).slideToggle().parent().toggleClass('open').fadeIn(500);
            $('body').addClass('modal-open');
        }
        
        if (options.keyboard) {
            $(document).keyup(function(d) {
		if (d.keyCode == 27) {
		    $('[data-modal]').hide();
                    $('.modal-bg').removeClass('open').fadeOut(500);
                    $('body').removeClass('modal-open');
		}
            });
        }
    };
 
    return this.each(make); 
  };

})(jQuery, window, document, undefined);