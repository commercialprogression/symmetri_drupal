/**
 * @file
 * Trigger for the Tobi library
 *
 * @see https://github.com/rqrauhvmra/Tobi
 */

(function ($, Drupal) {
  Drupal.behaviors.comproTobi = {
    attach: function (context, settings) {
      if (context === document) {
        var $defaultLinkedA = $('.child-display-mode--default-linked > a');
        if ($defaultLinkedA.length) {
          $defaultLinkedA.addClass('js-compro-tobi');
        }

        if (typeof Tobi === 'function') {
          var tobi = new Tobi({
            selector: '.js-compro-tobi',
            captions: false,
            zoom: false
          });
        }
      }
    }
  };
})(jQuery, Drupal);
