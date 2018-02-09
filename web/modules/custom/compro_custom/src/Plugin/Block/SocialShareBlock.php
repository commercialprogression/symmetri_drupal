<?php

/**
 * @file
 * Contains \Drupal\compro_custom\Plugin\Block\SocialShareBlock.
 */

namespace Drupal\compro_custom\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\Component\Utility\Html;

/**
 * Provides current page social share links and a favorite placeholder.
 *
 * @Block(
 *   id = "social_share_block",
 *   admin_label = @Translation("Share and favorites"),
 * )
 */
class SocialShareBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    global $base_url;
    $request = \Drupal::request();
    $route_match = \Drupal::routeMatch();
    $current_path = $request->getRequestUri();
    $current_url = $base_url . $current_path;
    $title = \Drupal::service('title_resolver')->getTitle($request, $route_match->getRouteObject());
    if (gettype($title) === 'object') {
      $title = $title->render();
      $title = strip_tags($title);
    }
    else if (isset($title['#markup'])) {
      $title = Html::escape($title['#markup']);
    }

    $facebook = Url::fromUri('https://www.facebook.com/sharer/sharer.php', [
      'query' => [
        'u' => $current_url,
      ],
      'attributes' => [
        'class' => ['icon', 'facebook'],
      ],
    ]);
    $facebook_link = Link::fromTextAndUrl(t('Facebook'), $facebook)->toString();
    $linkedin = Url::fromUri('http://www.linkedin.com/shareArticle', [
      'query' => [
        'url' => $current_url,
        'title' => $title,
      ],
      'attributes' => [
        'class' => ['icon', 'linkedin'],
      ],
    ]);
    $linkedin_link = Link::fromTextAndUrl(t('LinkedIn'), $linkedin)->toString();
    $email = [
      '#type' => 'html_tag',
      '#tag' => 'a',
      '#attributes' => [
        'class' => ['icon', 'envelope'],
        'href' => 'mailto:?subject=' . urlencode($title) . '&body=' . urlencode($current_url),
      ],
      '#value' => t('Email'),
    ];

    // Render array that returns button.
    return [
      '#cache' => [
        'contexts' => ['url'],
      ],
      '#type' => 'container',
      '#attributes' => [
        'class' => ['current-page-links']
      ],
      'share' => [
        '#type' => 'container',
        '#attributes' => [
          'class' => ['social-share']
        ],
        'icon' => [
          '#prefix' => '<span class="icon share">',
          '#markup' => t('Share'),
          '#suffix' => '</span>',
        ],
        'list' => [
          '#theme' => 'item_list',
          '#list_type' => 'ul',
          '#items' => [
            $linkedin_link,
            $facebook_link,
            $email,
          ]
        ],
      ],
      'favorite' => [
        '#prefix' => '<span class="disabled icon favorite tooltip" title="Feature coming soon">',
        '#markup' => t('Follow'),
        '#suffix' => '</span>',
      ],
    ];
  }

}
