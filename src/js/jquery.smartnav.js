(function ($) {

    $.fn.smartnav = function (params) {

        var defaults = {
            duration: 1000
        };

        params = $.extend({}, defaults, params);

        return this.each(function (element) {
            var $menu = $(this);
            var $links = $('a', $menu);
            var $window = $(window);
            var sections = [];
            var id = null;
            var scrollId = null;

            // Get sections of page
            $links.each(function (i, link) {

                // Ignore non anchar links and default anchor '#'
                var href = $(this).attr('href');
                if (href.charAt(0) === '#' && href.length > 1)
                    sections.push(href);
            });
            
            // Auto scroll
            $window.scroll(function (e) {
                var scrollTop = $window.scrollTop();
                var $s = null;
                for (var i in sections) {
                    $s = $(sections[i]);
                    if (scrollTop > $s.offset().top - $window.height() / 2)
                        scrollId = sections[i];
                }

                if (id !== scrollId) {
                    id = scrollId;
                    $links.removeClass('selected');
                    $('a[href=' + id + ']', $menu).addClass('selected');
                }

            });

            // Smooth scroll
            $links.click(function (e) {
                e.preventDefault();

                var to = 0;
                var id = $(this).attr('href');

                // If no href then stop
                // If id isn't an anchor then stop
                if (!id || id.charAt(0) !== '#')
                    return false;

                // id is an anchor, if id is found then go to top offset
                if (id !== '#')
                    to = $(id).offset().top;

                $('html,body').animate({
                    scrollTop: to
                }, params.duration);

                // Update browse url and history
                if (history.pushState) {
                    history.pushState(null, null, id);
                } else {
                    location.hash = id;
                }
            });
        });
    };

})(jQuery);
