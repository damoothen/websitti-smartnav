(function($){

    $.fn.smartnav = function(params){
        
        var defaults = {
            duration: 1000
        };
                
        params = $.extend({}, defaults, params);
        
        return this.each(function(element){
            $menu = $(this);
            $('a', $menu).click(function(e){
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
