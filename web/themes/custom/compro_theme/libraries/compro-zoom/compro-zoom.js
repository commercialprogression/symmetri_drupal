/**
 * @file
 * Theme code for using Zoom.js
 */

(function ($, Drupal) {
  Drupal.behaviors.comproZoom = {
    attach: function (context, settings) {
      if (context === document) {
        var $zoom = $('.compro-zoom');
        if ($zoom.length && $.isFunction($.fn.zoom)) {
          $zoom.zoom({
            magnify: 1.5
          });
        }
      }
    }
  };
})(jQuery, Drupal);
