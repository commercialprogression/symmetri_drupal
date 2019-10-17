/**
 * @file
 * Theme code for using tippyjs
 */
var comproTippyjsInit = false;
(function ($, Drupal) {
  Drupal.behaviors.comproTippyjs = {
    attach: function (context, settings) {
      if (context === document && !comproTippyjsInit) {
        comproTippyjsInit = true;

        // Tooltips using the library attributes.
        if (typeof tippy === 'function') {
          // Initialize tippy generically.
          tippy('[data-tippy-content]');

          // Add tips for hotspots.
          tippy('[data-tippy-interactive]', {
            content(reference) {
              const id = reference.getAttribute('aria-controls');
              const template = document.getElementById(id);
              return template.innerHTML;
            },
            duration: [800, 100],
            popperOptions: {
              positionFixed: true,
            },
            trigger: 'mouseenter focus click'
          });

          // Tooltips for hotspots.
          var $hotspots = $('.entity-bundle-hotspot');
          if ($hotspots.length) {
            // Disable default link/anchor behavior.
            $hotspots.find('.hotspot-anchor').on('click', function(e){
              e.preventDefault();
              return false;
            });
          }
        }
      }
    }
  };
})(jQuery, Drupal);
