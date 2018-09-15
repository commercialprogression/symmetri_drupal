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
          $('.compro-hamburger-icon').on('click', function () {
            $utility
              .toggleClass('is-active');
          })
        }

        // $utility.find("li.menu-item--expanded ").each( function () {
        //     $(this).find("> a").on('click', function (e) {
        //       if($utility.hasClass('is-active')) {
        //         e.preventDefault();
        //         $(this).parent().toggleClass('is-active');
        //       }
        //   });
        // });
      }
    }
  };
})(jQuery, Drupal);
