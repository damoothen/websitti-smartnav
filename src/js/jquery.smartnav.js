(function ($) {

    $.fn.smartnav = function (params) {

        var defaults = {
            linksSelector: 'a',
            duration: 1000,
            updateHistory: true,
            selectClass: 'selected'
        };

        params = $.extend({}, defaults, params);

        return this.each(function (element) {
            var $menu = $(this);
            var $links = $(params.linksSelector, $menu);
            var $window = $(window);
            var $document = $(document);
            var sections = [];
            var id = null;
            var scrollId = null;

            // Update history
            var updateHistory = function (id) {
                if (params.updateHistory) {
                    // Update browse url and history
                    if (history.pushState) {
                        history.pushState(null, null, id);
                    } else {
                        location.hash = id;
                    }
                }
            };

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

                // Special case: top of document is reached
                if (scrollTop === 0) {

                    // Check that first link is at top
                    $s = $(sections[0]);
                    if ($s.offset().top === 0)
                        scrollId = sections[0];

                }

                // Special case: bottom of document is reached
                else if (scrollTop + $window.height() >= $document.height()) {
                    $s = $(sections[sections.length - 1]);
                    if ($s.offset().top + $s.outerHeight() >= $document.height())
                        scrollId = sections[sections.length - 1];
                }

                // Normal use case
                else {
                    for (var i in sections) {
                        $s = $(sections[i]);
                        if (scrollTop > $s.offset().top - $window.height() / 2)
                            scrollId = sections[i];
                    }

                }

                if (id !== scrollId) {
                    id = scrollId;
                    $links.removeClass(params.selectClass);
                    $('a[href=' + id + ']', $menu).addClass(params.selectClass);
                    updateHistory(id);
                }


            });

            // Smooth scroll
            $links.click(function (e) {
                e.preventDefault();

                var to = 0;
                id = $(this).attr('href');

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

                updateHistory(id);

            });
        });
    };

})(jQuery);
