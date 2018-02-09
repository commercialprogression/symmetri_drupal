/**
 * @file
 * Trigger for autotrack by Google Analytics
 *
 * @see https://github.com/googleanalytics/autotrack
 */

(function ($, Drupal) {
  Drupal.behaviors.comproAutotrack = {
    attach: function (context, settings) {
      if (context === document) {
        // Add the desired autotracks and other automatic events.
        if (typeof ga === 'function') {
          /* Official GA Autotracks. */
          // ga('require', 'cleanUrlTracker'); // URL path consistency in GA
          ga('require', 'eventTracker'); // Attribute-based tracking in the markup.
          // ga('require', 'impressionTracker'); // Elements viewport visibility.
          ga('require', 'maxScrollTracker'); // How far down the page a user scrolls.
          // ga('require', 'mediaQueryTracker'); // Media query matching and changes.
          ga('require', 'outboundFormTracker'); // Form submits to external domains.
          ga('require', 'outboundLinkTracker'); // Link clicks to external domains.
          ga('require', 'pageVisibilityTracker'); // How long pages are in the visible state.
          ga('require', 'socialWidgetTracker'); // Events for official Facebook/Twitter widgets.
          // ga('require', 'urlChangeTracker'); // URL changes for single page applications.

          var $body = $(document),
          autotrackTimer;
          $body
            .on('click', function(e) {
              // Click events that don't take you off the page.
              clearTimeout(autotrackTimer);
              autotrackTimer = setTimeout($.proxy(function(e){
                var $this = $(this).eq(0);
                if ($this.text().length >= 3) {
                  ga('send', 'event', {
                    eventCategory: 'Page',
                    eventAction: 'click',
                    eventLabel: $this.text().trim().substr(0, 140).trim(),
                    transport: 'beacon'
                  });
                }
              }, e.target), 250, e);
            })
            .on('submit', function(e) {
              // Internal form submits tracking (since outbound comes from lib).
              var $target = $(e.target);
              ga('send', 'event', {
                eventCategory: 'Form (inbound)',
                eventAction: 'submit',
                eventLabel: $target.attr('id'),
                transport: 'beacon'
              });
            });
        }
      }
    }
  };
})(jQuery, Drupal);
