(function($) {
    $(function() {

        $('.code-wrapper').on("mousemove", function(e) {
            var offsets = $(this).offset();
            var fullWidth = $(this).width();
            var mouseX = e.pageX - offsets.left;

            if (mouseX < 0) { mouseX = 0; } else if (mouseX > fullWidth) { mouseX = fullWidth }


            $(this).parent().find('.divider-bar').css({
                left: mouseX,
                transition: 'none'
            });
            $(this).find('.design-wrapper').css({
                transform: 'translateX(' + (mouseX) + 'px)',
                transition: 'none'
            });
            $(this).find('.design-image').css({
                transform: 'translateX(' + (-1 * mouseX) + 'px)',
                transition: 'none'
            });
        });
        $('.yys_tx_dtg').on("mouseleave", function() {
            $(this).parent().find('.divider-bar').css({
                left: '50%',
                transition: 'all .3s'
            });
            $(this).find('.design-wrapper').css({
                transform: 'translateX(50%)',
                transition: 'all .3s'
            });
            $(this).find('.design-image').css({
                transform: 'translateX(-50%)',
                transition: 'all .3s'
            });
        });

    });
})(jQuery);