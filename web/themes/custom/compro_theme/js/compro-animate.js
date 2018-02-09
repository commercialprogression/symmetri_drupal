/**
 * @file
 * Theme code for using animate.css
 */

(function ($, Drupal) {
  Drupal.behaviors.comproAnimate = {
    attach: function (context, settings) {
      if (context === document) {
        // Scroll animations.
        var $window = $(window);

        var revealOnScroll = function() {
          var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() * 1.25;

          // Showed...
          $(".revealOnScroll:not(.animated)").each(function () {
            var $this = $(this),
              offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
              $this.addClass('animated ' + $this.data('animation'));
            }
          });
        };

        revealOnScroll();
        $window
          .on('load', revealOnScroll)
          .on('scroll', revealOnScroll); 
      }
    }
  };
})(jQuery, Drupal);
