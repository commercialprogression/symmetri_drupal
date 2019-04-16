<?php

namespace Drupal\compro_credit\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Provides a block crediting CP for site design.
 *
 * @Block(
 *   id = "compro_credit_block",
 *   admin_label = @Translation("Compro credit"),
 * )
 */
class ComproCreditBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    // External Uri.
    $url = Url::fromUri('https://www.symmetritechnology.com/',
      array(
        'attributes' => array(
          'class' => array(
            'compro-credit-link',
          ),
        ),
      )
    );
    $external_link = Link::fromTextAndUrl(t('Symmetri Technology'), $url);
    // Render array that returns link and text for block content.
    return array(
      'compro_text' => array(
        '#markup' => '<span class="compro-credit-text"> ' . t('Drupal Web Development by ') . $external_link->toString() . '</span>',
      ),
    );
  }

}
