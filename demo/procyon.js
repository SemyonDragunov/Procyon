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
        
        $('.spoiler-head').on('click', function() {
            $(this).toggleClass('open').next().slideToggle();
        });
        
        // Messages
        
        $('div.messages').prepend('<span class="close"></span>');
        
        $('span.close').on('click', function() {
            $(this).parent().fadeOut(500);
        });
	
	// Tabs
	
	$('.tabs:not(.collapsible)').each(function() {
	    li_first = $(this).children('ul').find('li:first');
	    li_first_a_id = li_first.children('a').attr('href').replace('#', '');
	    
	    li_first.addClass('active');
	    $(this).children('section').find('div[id=' + li_first_a_id + ']').addClass('active');
	});
	
	$('.tabs > ul > li > a').on('click', function() {
	    var $tabs = $(this).closest('.tabs'),
		$open_elem = $tabs.find('> ul > li.active, > section > div.active'),
		//li_index = $(this).parent().index(),
		url = $(this).attr('href'),
		regexp = /(#.*)/,
		m;
	    
	    if (!$(this).parent().hasClass('active')) {
		$open_elem.removeClass('active');
		$(this).parent().addClass('active');
		$tabs.find('> section > div#' + url).addClass('active');
	    }
	    /*else {
		$tabs.find('li.open').removeClass('open');
		$tabs.find('div#' + url).removeClass('open');
	    }*/
	    
	    // Collapsible close tabs
	    
	    if ($(this).parent().hasClass('active') && $tabs.hasClass('collapsible')) {
		$open_elem.removeClass('active');
	    }
	    
	    return false;
	    
	    /*while ((m = regexp.exec(url)) != null) {
		if (m.index === regexp.lastIndex) {
		    regexp.lastIndex++;
		}
		
		$tabs.children('section').prepend();
		
		// View your result using the m-variable.
		// eg m[0] etc.
	    }*/
	    
	    //$open_link.removeClass('open').siblings().removeClass('open');
	    
	    /*$(this).addClass('open').siblings().removeClass('open')
		.parents('div.section').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();*/
	});
	
	/*
	 * Back to top
	 */
	
	$(".back-to-top").on('click', function() {
	    
	    if ($('.modal-bg.open').length) {
		$('.modal-bg.open').animate({
		    scrollTop: 0
		}, 500);
	    }
	    else {
		$('body, html').animate({
		    scrollTop: 0
		}, 1000, 'swing');
	    }
	    
	}).fadeOut(500);
	
	$window.on('scroll', function() {
		if ($window.scrollTop() > 200)
		    $(".back-to-top").fadeIn();
		else
		    $(".back-to-top").fadeOut();
	});
	
	/* Not work
	    $('.modal-bg.open').on('scroll', function() {
		
	    if ($('.modal-bg.open').scrollTop() > 50)
		    $(".back-to-top").fadeIn();
		else
		    $(".back-to-top").fadeOut();
		    
	    });*/
	
        // Modal window in HTML
        
        $('[data-modal]').wrap('<div class="modal-bg"></div>');
        
        $('[data-modal-id]').on('click', function() {
	    $(this).removeAttr('href');
            var modal_id = $(this).data('modal-id');
            
            if ($('.modal-bg.open').length) {
                //$('[data-modal]').hide();
                $('.modal-bg').removeClass('open')/*.hide()*/;
            }
            
            $('#' + modal_id)/*.slideToggle()*/.parent().addClass('open')/*.fadeIn(500)*/;
            $('body').addClass('fixed');
            
            $(document).keyup(function(d) {
		if (d.keyCode == 27) {
		    //$('[data-modal]').hide();
                    $('.modal-bg').removeClass('open')/*.fadeOut(500)*/;
                    $('body').removeClass('fixed');
		}
	    });
        });
        
        $('[data-modal-close]').on('click', function() {
	    $(this).removeAttr('href');
            //$('[data-modal]').hide();
            $('.modal-bg').removeClass('open')/*.fadeOut(500)*/;
            $('body').removeClass('fixed');
	    return false;
        });
        
	$('.modal-bg').on('click', function(event) {
	    if ($(event.target).closest('[data-modal]').length) return;
	    //$('[data-modal]').hide();
            $('.modal-bg').removeClass('open')/*.fadeOut(500)*/;
            $('body').removeClass('fixed');
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
	
	/*
	 * Topbar mobile
	 */

	var nameBack = '<<<<<<<',
	    mobileWidth = 991, // Tablet
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
	
	$('.topbar .toggle').on('click', function() {
	    var $topbar = $(this).closest('.topbar');
	    
	    $topbar.toggleClass('open').css('height', '').find('li.dropdown.open').removeClass('open');
	    
	    if ($topbar.is('.fixed-top')) {
		var fixedMenu = true;
	    }
	    
	    if ($topbar.outerHeight() > winHeight() && fixedMenu) {
		$topbar.css({'bottom' : '0' , 'overflow-y' : 'scroll'});
		$('body').addClass('fixed');
	    }
	    else {
		$topbar.css({'bottom' : '' , 'overflow-y' : 'hidden'});
		$('body').removeClass('fixed');
	    }
	});
	
	$('.topbar input:not([type="submit"])').on('click', function() {
	    return false;
	});
	
	$('.topbar li:not(.dropdown, .toggle, .back)').on('click', function() {
	    $(this).closest('.topbar').css('height', '').removeClass('open').find('li.dropdown.open').removeClass('open');
	    $('body').removeClass('fixed');
	});
	
	$('.topbar li.dropdown > a').on('click', function(/*e*/) {
	    $(this).removeAttr('href');
	    
	    if (winWidth() <= mobileWidth) {
		var $topbar = $(this).closest('.topbar');
		var heightMenu = $(this).parent('li.dropdown').children('ul').outerHeight() + heightTopMenu;
		
		$(this).parent('li.dropdown').toggleClass('open');
		$topbar.css('height', heightMenu);
		
		if (winHeight() < heightMenu) {
		    $topbar.css({'bottom' : '0' , 'overflow-y' : 'scroll'});
		    $('body').addClass('fixed');
		}
		else {
		    $topbar.css({'bottom' : '' , 'overflow-y' : 'hidden'});
		    $('body').removeClass('fixed');
		}
	    }
	    
	    /*if (window.location.hash) {
		e.preventDefault();
	    }
	    
	    e.preventDefault();*/
	});
	
	$('.topbar .back').on('click', function() {
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
	
        // Superbar & Verticalbar
        
	function slideMenus(element) {
	    if (element.hasClass('open')) {
		element.removeClass('open');
		element.find('li').removeClass('open').find('ul').slideUp();
		element.find('ul').slideUp();
	    }
	    else {
		element.addClass('open');
		element.children('ul').slideDown();
		element.siblings('li').children('ul').slideUp();
		element.siblings('li').removeClass('open').find('li').removeClass('open').find('ul').slideUp();
		//element.siblings('li').find('li').removeClass('open').find('ul').slideUp();
		//element.siblings('li').find('ul').slideUp();
	    }
	}
	
        $('.toggle-superbar, .superbar a').on('click', function() {
	    var $superbar = $('.superbar');
	    
	    if ($(this).parent('li').hasClass('dropdown')) {
		return false;
	    }
	    
            if ($superbar.hasClass('open')) {
                $superbar.removeClass('open');
            }
	    else {
		$superbar.addClass('open');
	    }
        });
	
	$('.verticalbar li.dropdown > a').on('click', function() {
	    var element = $(this).parent('li');
	    
	    $(this).removeAttr('href');
	    
	    slideMenus(element);
	});
	
	$('.superbar li.dropdown > a').on('click', function() {
	    var element = $(this).parent('li');
	    
	    $(this).removeAttr('href');
	    
	    slideMenus(element);
	});
	
	// Screen saver "Do not go"
	
	if (mobileWidth <= winWidth()) {
	    
	    $window.on('mouseleave', function() {
		$('.do-not-go').addClass('open');
	    });
	    $window.on('mouseenter', function() {
		$('.do-not-go').removeClass('open');
	    });
	    
	}
	
	// Menu to anchor
        
        var lastId,
            topMenu = $('.topbar'),
            topMenuHeight = topMenu.outerHeight() + 15,
            menuItems = topMenu.find('a:not(.no-click)'),
            scrollItems = menuItems.map(function() {
                var item = $($(this).attr('href'));
                if (item.length) { return item; }
            });

        menuItems.click(function(e) {
            var href = $(this).attr('href'),
                offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 1000, 'swing');
            e.preventDefault();
        });
	
	/*$('.topbar a[href*="#"]:not(.no-click)').on('click', function() {
	    var href = $(this).attr('href'),
                offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 1000, 'swing');
            e.preventDefault();
	});*/

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
		    //.parents('li.dropdown').removeClass('active').children('a.no-click').removeClass('active') // Не работает (убрать подстветку родителей)
                    .end().filter('[href=#'+id+']').addClass('active').parent().addClass('active')
		    //.parents('li.dropdown').addClass('active').children('a.no-click').addClass('active'); // Работает (подсветка родителей)
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
            $(this)/*.slideToggle()*/.parent().removeClass('open')/*.hide()*/;
            $('body').removeClass('fixed');
        } else {
            if ($('.modal-bg.open').length) {
                //$('[data-modal]').hide();
                $('.modal-bg').removeClass('open')/*.hide()*/;
            }
            
            $(this)/*.slideToggle()*/.parent().addClass('open')/*.fadeIn(500)*/;
            $('body').addClass('fixed');
        }
        
        if (options.keyboard) {
            $(document).keyup(function(d) {
		if (d.keyCode == 27) {
		    //$('[data-modal]').hide();
                    $('.modal-bg').removeClass('open')/*.fadeOut(500)*/;
                    $('body').removeClass('fixed');
		}
            });
        }
    };
 
    return this.each(make); 
  };

})(jQuery, window, document, undefined);