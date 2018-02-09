<?php

/**
 * @file
 * Contains \Drupal\compro_custom\Plugin\Block\HeroTitleBlock.
 */

namespace Drupal\compro_custom\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\TitleBlockPluginInterface;

/**
 * Provides either the current page's hero or the page title.
 *
 * @Block(
 *   id = "hero_title_block",
 *   admin_label = @Translation("Hero or Page Title"),
 * )
 */
class HeroTitleBlock extends BlockBase implements TitleBlockPluginInterface {

  /**
   * The page title: a string (plain title) or a render array (formatted title).
   *
   * @var string|array
   */
  protected $title = '';

  /**
   * {@inheritdoc}
   */
  public function setTitle($title) {
    $this->title = $title;
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $return = [
      '#cache' => [
        'contexts' => ['url'],
      ],
      '#type' => 'page_title',
      '#title' => $this->title,
    ];

    // If page entity has a hero, make block contents that instead.
    $parameters = \Drupal::routeMatch()->getParameters()->all();
    if (isset($parameters['node'])) {
      $node = $parameters['node'];
      if ($node->hasField('field_hero')) {
        $field_hero = $node->get('field_hero')->getValue();
        if (isset($field_hero) && count($field_hero)) {
          // Set the block content to the hero if appropriate.
          $return = [
            '#cache' => [
              'contexts' => ['url'],
            ],
            'field' => $node->get('field_hero')->view([
              'label' => 'hidden',
              'type' => 'entity_reference_entity_view',
              'settings' => [
                'view_mode' => 'default',
                'link' => FALSE,
              ],
            ]),
          ];
        }
      }
    }

    return $return;
  }

}
