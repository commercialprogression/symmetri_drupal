/**
 * @file
 * Theme code for using headroom.js
 */

(function ($, Drupal) {
  Drupal.behaviors.comproSuperfish = {
    attach: function (context, settings) {
      if (context === document) {
        var $superfish = $('.compro-superfish > ul.menu');
        if ($superfish.length && $.isFunction($.fn.superfish)) {
          // Initialize headroom.
          $superfish.superfish();
        }
      }
    }
  };
})(jQuery, Drupal);
