/*
 * Procyon v0 (http://procyon.sl-7.ru)
 * Copyright SL7 (http://sl-7.ru)
 * Licensed under GNU GPL v2
 */

(function ($) {
    
    $(document).ready(function () {
        
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
        
        // Menu to anchor
        
        var lastId,
            topMenu = $('nav'),
            topMenuHeight = topMenu.outerHeight(),
            menuItems = topMenu.find('a'),
            scrollItems = menuItems.map(function(){
                var item = $($(this).attr('href'));
                if (item.length) { return item; }
            });


        menuItems.click(function(e){
            var href = $(this).attr('href'),
                offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 1000, 'swing');
            e.preventDefault();
        });

        $(window).scroll(function(){
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
                    .end().filter('[href=#'+id+']').addClass('active').parent().addClass('active');
            }
        });
        
	// Topbar mobile
	
	var nameBack = '<<<<<<<';
	var heightTopMenu = 50;
	
	$('.topbar .toggle').bind('click', function() {
	    $(this).closest('.topbar').toggleClass('open').css('height', '').find('li.dropdown.open').removeClass('open');
	});
	
	$('.topbar').find('li.dropdown > ul').prepend('<li class="back">' + nameBack + '</li>');
	
	$('.topbar li:not(.dropdown, .toggle, .back)').bind('click', function() {
	    $(this).closest('.topbar').css('height', '').removeClass('open').find('li.dropdown.open').removeClass('open');
	});
	
	$.fn.toggleMenu = function() {
	    var heightMenu = this.parent('li.dropdown').children('ul').outerHeight(true) + heightTopMenu;
	    
	    this.parent('li.dropdown').toggleClass('open')
	    this.closest('.topbar').css('height', heightMenu);
	}
	
	$('.topbar li.dropdown > a').bind('click', function() {
	    $(this).toggleMenu();
	});
	
	$('.back').bind('click', function() {
	    var heightMenu = $(this).parent('ul').parent('li.dropdown').parent('ul').outerHeight(true) + heightTopMenu;
	    
	    $(this).parent('ul').parent('li.dropdown').removeClass('open').find('.open').removeClass('open');
	    if ($(this).closest('li.dropdown').parent('ul').parent('li.dropdown').length) {
		$(this).closest('.topbar').css('height', heightMenu);
	    } else {
		$(this).closest('.topbar').css('height', '');
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