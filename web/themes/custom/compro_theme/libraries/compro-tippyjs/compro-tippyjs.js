/**
 * @file
 * Theme code for using tippyjs
 */

(function ($, Drupal) {
  Drupal.behaviors.comproTippyjs = {
    attach: function (context, settings) {
      if (context === document) {
        if (typeof tippy === 'function') {
          // Initialize headroom.
          tippy('[title]', {
            theme: 'compro'
          })
        }
      }
    }
  };
})(jQuery, Drupal);
