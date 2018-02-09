/**
 * @file
 * Theme code for using iframeResizer
 */

(function ($, Drupal) {
  Drupal.behaviors.comproIframeResizer = {
    attach: function (context, settings) {
      if (context === document) {
        if (typeof iFrameResize === 'function') {
          iFrameResize(null, '.js--iframe-resize iframe');
        }
      }
    }
  };
})(jQuery, Drupal);
