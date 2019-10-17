/**
 * @file
 * JavaScript for Compro theme.
 */
var comproThemeInit = false;
(function ($, Drupal) {
  Drupal.behaviors.comproTheme = {
    attach: function (context, settings) {
      if (context === document && !comproThemeInit) {
        comproThemeInit = true;

        // Semi-modernizer flexbox check.
        var d = document.documentElement.style;
        if (('flexWrap' in d) || ('WebkitFlexWrap' in d) || ('msFlexWrap' in d)) {
          $('body').addClass('has-flexbox');
        }

        // Give external links target="_blank" and rel="noopener"
        var $a = $('a');
        $a.each(function () {
          var $this = $(this);
          if (this.href.length
            && this.hostname !== window.location.hostname
            && this.href.substring(0, 6) !== 'mailto'
            && this.href.substring(0, 3) !== 'tel'
            && this.href.substring(0, 1) !== '#'
          ) {
            $this
              .attr('target', '_blank')
              .attr('rel', 'noopener noreferrer');
          }
        });

        // Float labels.
        $('.form-type-textfield, .form-type-email, .form-type-password, .webform-component-textfield, .webform-component-email').each(function() {
          var $this = $(this);
          if (!$this.find('input').val()) {
            $this.addClass('empty-textfield');
          }

          $this.on('keydown change', 'input', function() {
            var $input = $(this);
            if ($input.val()) {
              $input.parents('.form-item').removeClass('empty-textfield');
            }
            else {
              $input.parents('.form-item').addClass('empty-textfield');
            }
          });
        });

        // Make card clicks go to destination, even if not a link.
        var $cards = $('.js-clickable-card');
        if ($cards.length) {
          // Add a class if the card links out.
          $cards.each(function(){
            var $this = $(this);
            var $link = $this.children().not('.contextual').find('a');
            if ($link.length) {
              $this
                .addClass('cursor--pointer')
                .addClass('hover--bg');
            }
          });

          // Make card links go if clicked anywhere in card.
          $cards.on('click', function(e){
            if (!$(e.target).is('a,button')) {
              var $this = $(this);
              var $link = $this.children().not('article,.contextual').find('a');
              if ($link.length) {
                // Default.
                var thisUrl = $link.eq(0).attr('href');

                // Ensure the main link is the clicky one.
                if ($link.parents('h2').length) {
                  thisUrl = $link.parents('h2').find('a').eq(0).attr('href');
                }

                // Open URLs with three-letter file extensions in a new window.
                if (thisUrl.substr(-4, 1) === '.') {
                  window.open(thisUrl, '_blank');
                }
                else {
                  location.href = thisUrl;
                }
              }
            }
          });
        }

        // Handle search icon.
        var $topSearch = $('.region--utility .block-search-icon-block');
        var $trigger = $topSearch.find('.search-icon');
        var $searchElement = $topSearch.find('.search-form-wrapper');
        if ($trigger.length > 0) {
          var $searchInput = $topSearch.find('#edit-s');

          $trigger.on('click', function () {
            $topSearch.toggleClass('search-is-open');
            $searchElement.toggleClass('is-open');
            $searchInput.focus();
          });
        }

        $(document).click(function(event) {
          var $target = $(event.target);
          if(!$target.closest('.block-search-icon-block').length &&
            $searchElement.hasClass('is-open')) {
            $searchElement.toggleClass('is-open');
            $topSearch.toggleClass('search-is-open');
          }
        });

        // Make iframe videos responsive-ish.
        var $allYT = $("iframe[src*='//www.youtube.com']");
        var YTResize = function () {
          $allYT.each(function() {
            if (this.clientWidth < this.width) {
              // Set the video height based on the aspect ratio.
              $(this).css({'height': (this.clientWidth * (this.height / this.width)) + 'px'});
            }
            else {
              // Remove the CSS if the video is full-sized to the attr.
              $(this).css({'height': ''});
            }
          });
        };

        var YTTimer;
        $(window).resize(function() {
          clearTimeout(YTTimer);
          YTTimer = setTimeout(YTResize, 344);
        });
        YTResize();
      }
    }
  };
})(jQuery, Drupal);
