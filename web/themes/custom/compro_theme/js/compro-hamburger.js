/**
 * @file
 * Theme code for hamburger menus.
 *
 * Given a container with the compro-hamburger class, this will put a duplicate
 * of the container's contents with a different wrapper (and hamburger toggle
 * button) before it. For complicated nav re-jiggerings, it may be necessary to
 * clone/split/tweak the HTML going into the panel.
 */

(function ($, Drupal) {
  Drupal.behaviors.comproHamburger = {
    attach: function (context, settings) {
      if (context === document) {
        // Insert a wrapper.
        var $utility = $('.compro-hamburger');
        if ($utility.length) {
          var $panelTemplate = '<section class="compro-hamburger-panel">';
          $panelTemplate += '<button class="hamburger hamburger--squeeze" ' +
            'aria-label="Menu" aria-controls="hamburger-content" aria-expanded="false" type="button">';
          $panelTemplate += '<span class="hamburger-box">';
          $panelTemplate += '<span class="hamburger-inner"></span>';
          $panelTemplate += '</span>';
          $panelTemplate += '<span class="hamburger-label visually-hidden">Menu</span>';
          $panelTemplate += '</button>';
          $panelTemplate += '<div id="hamburger-content" class="content"></div>';
          $panelTemplate += '</section>';
          $panelTemplate = $($panelTemplate);

          $utility.each(function (i) {
            var $this = $(this),
              $clone = $this.clone(),
              $thisPanel = $panelTemplate.clone();

            $clone.find('[id],[for],[aria-labelledby]').each(function() {
              var $cThis = $(this);
              if ($cThis[0].hasAttribute('id')) {
                $cThis.attr('id', $cThis.attr('id') + i);
              }

              if ($cThis[0].hasAttribute('for')) {
                $cThis.attr('for', $cThis.attr('for') + i);
              }

              if ($cThis[0].hasAttribute('aria-labelledby')) {
                $cThis.attr('aria-labelledby', $cThis.attr('aria-labelledby') + i);
              }
            });

            $thisPanel
              .find('button').attr('aria-controls', 'hamburger-content-' + i).end()
              .find('#hamburger-content').attr('id', 'hamburger-content-' + i);

            $this.addClass('js-hamburgered').before(
              $thisPanel
                .find('.content').append($clone.html()).end()
            );
          });

          $('.compro-hamburger-panel').on('click', '.hamburger', function () {
            var $this = $(this);
            if ($this.attr('aria-expanded') === 'false') {
              $this.attr('aria-expanded', 'true');
            }
            else {
              $this.attr('aria-expanded', 'false');
            }

            $this
              .toggleClass('is-active')
              .parents('.compro-hamburger-panel').toggleClass('open');
          })
        }
      }
    }
  };
})(jQuery, Drupal);
