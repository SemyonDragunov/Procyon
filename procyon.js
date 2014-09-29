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
        });
        
        $('.modal-bg').bind('click', function() {
            $('[data-modal]').hide();
            $('.modal-bg').removeClass('open').fadeOut(500);
            $('body').removeClass('modal-open');
        });
        
        $('[data-modal]').bind('click', function() {
            return false;
        });
        
        // Menu to anchor
        
        var lastId,
            topMenu = $('nav'),
            topMenuHeight = topMenu.outerHeight() + 15,
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
        
        // Mobyle sidebar
        
        $('.sidebar-menu').bind('click', function() {
            if ($('.sidebar-open').length) {
                $('[data-wrapper]').removeClass('sidebar-open');
            } else {
                $('[data-wrapper]').addClass('sidebar-open');
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