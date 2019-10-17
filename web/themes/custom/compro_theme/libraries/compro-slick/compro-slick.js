/**
 * @file
 * Theme code for slick slideshows.
 */
var comproSlickInit = false;
(function ($, Drupal) {
  Drupal.behaviors.comproSlick = {
    attach: function (context, settings) {
      if (context === document && !comproSlickInit) {
        comproSlickInit = true;

        // Slick slideshows.
        var $comproSlick = $('.conpro-slick, .layout--carousel').not('.slick-initialized');
        if ($.isFunction($.fn.slick) && $comproSlick.length) {
          $comproSlick.each(function () {
            var $this = $(this);
            if ($this.children().not("[data-contextual-id]").length > 3) {
              $this.children('[data-contextual-id]').remove();
              $this.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: true,
                infinite: true,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: "unslick"
                  }
                ]
              });
            }
          });
        }
      }
    }
  };
})(jQuery, Drupal);
