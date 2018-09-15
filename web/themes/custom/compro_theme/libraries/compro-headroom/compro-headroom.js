/**
 * @file
 * Theme code for using headroom.js
 */

(function ($, Drupal) {
  Drupal.behaviors.comproHeadroom = {
    attach: function (context, settings) {
      if (context === document) {
        /**
         * Function to tweak swoosh padding.
         */
        var headroomPadder = function() {
          // Top-pad the next sibling to the header plus change.
          $headroom.each(function () {
            var $this = $(this),
              thisHeight = $this.height(),
              topPad = (window.innerWidth >= 615) ? 60 : 20;

            $this.next().css({
              'padding-top': (thisHeight + topPad) + 'px'
            });
          });
        };

        /**
         * Function for anything that should run on resize.
         */
        var headroomResize = function() {
          headroomPadder();
        };

        var $headroom = $('.compro-headroom');
        if ($headroom.length && $.isFunction($.fn.headroom)) {
          // Window events.
          var headroomTimer;
          $(window)
            .on('load', function () {
              // Initialize headroom.
              $headroom.headroom();
              headroomPadder();
            })
            .on('resize', function () {
              clearTimeout(headroomTimer);
              headroomTimer = setTimeout(headroomResize, 333);
            });
        }
      }
    }
  };
})(jQuery, Drupal);
