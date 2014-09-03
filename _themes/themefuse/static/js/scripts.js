/**
 * Responsive Menu, Animated Dropdown
 */
jQuery(document).ready(function($) {
    $('.nav-menu').slicknav();

    $(".nav-menu ul").addClass('animated hidden');

    var menuItemWidth, submenuItemWidth;

    $(".nav-menu > li").hover(function(){
        var $this = $(this);

        $this.children('ul').removeClass().addClass('animated');

        menuItemWidth = $this.innerWidth();
        submenuItemWidth = $this.children("ul").innerWidth();
        $this.children("ul").css('left' , (menuItemWidth-submenuItemWidth)/2);

        $this.children('ul').addClass('fadeInDownSmall').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $this.children('ul').removeClass().addClass('animated')
        });
    }, function(){
        $(this).children('ul').addClass('fadeOutUpSmall').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass().addClass('hidden')
        })
    })
});

/**
 * Animated Header
 */
jQuery(function($) {
    $('.page-header').prepend('<img src="'+ tfVars['header_bg_src'] +'" alt="" class="testimage hidden">');

    $('.testimage').load(function(){
        $(".main-header .spinner, .main-header .testimage").remove();
        $(".page-header, .site-logo, .primary-navigation").removeClass('invisible').addClass('animated fadeIn');

        setTimeout(function(){
            $(".page-title-before").removeClass('invisible').addClass('animated fadeInDown');
            $(".page-title").removeClass('invisible').addClass('animated fadeInLeft');
            $(".page-subtitle").removeClass('invisible').addClass('animated fadeInRight');
            $("#search-form").removeClass('invisible').addClass('animated fadeInUp');
        }, 400);
    });
});

/**
 * ContactUs Modal Window
 */
jQuery(document).ready(function($) {
    $('[href="#contact-us"]').on('click', function(e) {
        e.preventDefault();
        $('.section-contacts .page-overlay, .section-contacts .contact-modal').removeClass('hidden');
        window.onmousewheel = document.onmousewheel = window.onscroll = document.onscroll = function (e) {return false;};
    });

    $('.section-contacts').on('click', '.page-overlay, .icon-close-thin', function() {
        var overlay = $(this).parents('.section-contacts').children('.page-overlay'),
            modal = $(this).parents('.section-contacts').children('.contact-modal');

        if (Modernizr.cssanimations) {
            modal.addClass('growOut');
            overlay.addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                overlay.removeClass('fadeOut').addClass('hidden');
                modal.removeClass('growOut').addClass('hidden');
                window.onmousewheel = document.onmousewheel = window.onscroll = document.onscroll = function (e) {return true;};
            });
        } else {
            overlay.addClass('hidden');
            modal.addClass('hidden');
            window.onmousewheel = document.onmousewheel = window.onscroll = document.onscroll = function (e) {return true;};
        }
    });
});

/**
 * On first level menu click, open it's first sub-menu
 */
jQuery(function($){
    $('#menu').on('click', 'li.toctree-l1 > a', function(e){
        e.preventDefault();

        window.location.replace(
            $(this).closest('li').find('li.toctree-l2:first-child > a').attr('href')
        );
    });

    /**
     * Make breadcrumbs work the same way
     */
    $('#breadcrumbs').on('click', 'li > a', function(e){
        var href = $(this).attr('href');
        var $menuItemLink = $('#menu li.toctree-l1 > a[href="'+ href +'"]');

        if ($menuItemLink.length) {
            e.preventDefault();

            $menuItemLink.trigger('click');
        }
    });

    /**
     * Do not allow menu index to be displayed, redirect to first sub-menu
     */
    (function(){
        var $openMenu = $('#menu > ul:not(#custom-menu-top) li.toctree-l1.current');

        if (!$openMenu.length) {
            // there is no menu open
            return;
        }

        if ($openMenu.find('li.toctree-l2.current').length) {
            // this page is a sub-menu page, it's ok
            return;
        }

        /**
         * Redirect to first sub-menu
         *
         * Click on menu link will be handles by the event above that will do the redirect
         */
        $openMenu.find('> a').trigger('click');
    })();

    /**
     * On pagination link click
     * if this link is a fist level menu link
     * redirect to first sub-menu
     */
    $('.pagination').on('click', 'a', function(e){
        var href = $(this).attr('href');
        var $menuItemLink = $('#menu li.toctree-l1 > a[href="'+ href +'"]');

        if ($menuItemLink.length) {
            e.preventDefault();

            $menuItemLink.trigger('click');
        }
    });

    /**
     * Change "prev" pagination link to last sub-menu if it's a link to first level menu
     */
    (function(){
        var $prev = $('.pagination .prev');

        if (!$prev.length) {
            // this is front page, does not have "prev" link in pagination
            return;
        }

        var $menuItemLink = $('#menu li.toctree-l1 > a[href="'+ $prev.attr('href') +'"]');

        if (!$menuItemLink.length) {
            // "prev" link does not point to first level menu, do nothing
            return;
        }

        var $menuItem = $menuItemLink.closest('li.toctree-l1');

        // move to previous menu
        $menuItem = $menuItem.prev();

        if (!$menuItem.length) {
            // this is first menu item, get custom added menu
            $menuItem = $('#menu > ul#custom-menu-top li.toctree-l1');
        }

        var $menuItemLink = $menuItem.find('> a');
        var $lastSubMenu = $menuItem.find('li.toctree-l2:last-child > a');

        /**
         * Set "prev" link text and href as last sub-menu
         */
        {
            $prev
                .attr('href', $lastSubMenu.attr('href'))
                .find('span').html($menuItemLink.html());
        }
    })();
});

/**
 * Allow to select external links
 * jQuery('a:external')
 */
jQuery.expr[':'].external = function(obj){
    return !obj.href.match(/^mailto\:/)
        && (obj.hostname != location.hostname)
        && !obj.href.match(/^javascript\:/)
        && !obj.href.match(/^$/);
};

/**
 * Add target="_blank" to external links
 */
jQuery(function($){
    $('#body a:external').attr('target', '_blank');
});

/**
 * Add anchors to menu, pagination and breadcrumbs links
 * To not show that big header when you browse the documentation
 */
jQuery(function($){
    $('.pagination a, #menu li > a, #breadcrumbs a').each(function(){
        var $a = $(this);
        var href = $a.attr('href');

        if (href.indexOf('#') != -1) {
            // link already has nachor
            return;
        }

        $a.attr('href', href +'#content');
    });
});