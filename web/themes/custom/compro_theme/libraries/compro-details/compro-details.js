/**
 * @file
 * Theme code for slick slideshows.
 */

(function ($, Drupal) {
  Drupal.behaviors.comproDetails = {
    attach: function (context, settings) {
      if (context === document) {
        // Details polyfill.
        var $details = $('details');
        if ($details.length && $.isFunction($.fn.details)) {
          $details.details();
        }
      }
    }
  };
})(jQuery, Drupal);
