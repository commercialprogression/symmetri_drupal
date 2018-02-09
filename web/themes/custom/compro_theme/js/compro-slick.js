/**
 * @file
 * Theme code for slick slideshows.
 */

(function ($, Drupal) {
  Drupal.behaviors.comproSlick = {
    attach: function (context, settings) {
      if (context === document) {
        // Slick slideshows.
        var $sliders = $('.slicked').not('.slick-initialized');
        if ($.isFunction($.fn.slick) && $sliders.length) {
          $sliders.slick();
        }
      }
    }
  };
})(jQuery, Drupal);
