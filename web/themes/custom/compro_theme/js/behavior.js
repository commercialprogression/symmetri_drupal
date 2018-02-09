/**
 * @file
 * JavaScript for Compro theme.
 */

(function ($, Drupal) {
  Drupal.behaviors.comproTheme = {
    attach: function (context, settings) {
      if (context === document) {
        // Semi-modernizer flexbox check.
        var d = document.documentElement.style;
        if (('flexWrap' in d) || ('WebkitFlexWrap' in d) || ('msFlexWrap' in d)) {
          $('body').addClass('has-flexbox');
        }

        // Give external links target="_blank" and rel="noopener"
        var $a = $('a');
        $a.each(function (i) {
          var $this = $(this);
          if (this.href.length
            && this.hostname !== window.location.hostname
            && this.href.substring(0, 1) !== '#'
          ) {
            $this
              .attr('target', '_blank')
              .attr('rel', 'noopener noreferrer');
          }
        });
      }
    }
  };
})(jQuery, Drupal);
