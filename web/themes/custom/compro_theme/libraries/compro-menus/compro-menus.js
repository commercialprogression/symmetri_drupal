/**
 * @file
 * Theme code for hamburger menus.
 *
 * Given a container with the compro-hamburger class, this will put a duplicate
 * of the container's contents with a different wrapper (and hamburger toggle
 * button) before it. For complicated nav re-jiggerings, it may be necessary to
 * clone/split/tweak the HTML going into the panel.
 */
comproMenusInit = false;
(function ($, Drupal) {
  Drupal.behaviors.comproMenus = {
    attach: function (context, settings) {
      if (context === document && !comproMenusInit) {
        comproMenusInit = true;
        var $body = $('body');
        // Add an overlay that's hidden by default.
        $body.prepend('<div class="js-modal-overlay modal-overlay"></div>');

        // Initialize superfish dropdowns based on class.
        // @todo switch this to pure class manipulation, maybe with poppler.
        var $superfish = $body.find('.compro-superfish > ul.menu');
        if ($superfish.length && $.isFunction($.fn.superfish)) {
          // Initialize headroom.
          $superfish.superfish();
        }

        // Core class manipulation for showing menus.
        var $icon = $body.find('.compro-hamburger-icon');
        if ($icon.length) {
          $icon.on('click', function () {
            // Make it possible to have multiple panels by basing on the
            // aria-controls attribute selector.
            var $this = $(this),
              ariaControls = $this.attr('aria-controls');
            var $ariaControls = $('#' + ariaControls);

            // Toggle classes for applicable elements.
            $this
              .toggleClass('is-active');
            $ariaControls
              .toggleClass('hamburger-active')
              .toggleClass('is-active');
            $body.toggleClass('js-hamburger-is-active');
            if ($this.parents('.headroom').length) {
              $body.toggleClass('js-disable-headroom');
            }
          });

          // Specify clickout behavior using an overlay to cheat.
          $('.modal-overlay').on('click', function() {
            $('.compro-hamburger-icon.is-active')[0].click();
          });
        }
      }
    }
  };
})(jQuery, Drupal);
