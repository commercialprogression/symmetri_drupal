<?php

namespace Drupal\contact_info\Plugin\Block;

/**
 * @file
 * Contains \Drupal\contact_info\Plugin\Block/MapBlock.
 */

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a block with an address.
 *
 * @Block(
 *   id = "map",
 *   admin_label = @Translation("Map"),
 * )
 */
class MapBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    // Grab contact info data.
    $contact_info = \Drupal::config('contact_info.setup');
    $map_settings = $this->getConfiguration();

    return contact_info_create_map($contact_info, $map_settings);
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    // Configuration form for map/directions block.
    $map_data = $this->getConfiguration();

    $form['api_key'] = array(
      '#title' => t('Google API key'),
      '#type' => 'textfield',
      '#required' => TRUE,
      '#default_value' => isset($map_data['api_key']) ? $map_data['api_key'] : 'AIzaSyAkkBDnKYln9G2v8PLIFUiUUmqyyiZ4uxw',
    );

    $form['dimensions'] = array(
      '#title' => t('Dimensions'),
      '#type' => 'fieldset',
    );

    $form['dimensions']['width'] = array(
      '#title' => t('Width'),
      '#type' => 'textfield',
      '#required' => TRUE,
      '#default_value' => isset($map_data['width']) ? $map_data['width'] : '600',
    );

    $form['dimensions']['height'] = array(
      '#title' => t('Height'),
      '#type' => 'textfield',
      '#required' => TRUE,
      '#default_value' => isset($map_data['height']) ? $map_data['height'] : '450',
    );

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['api_key'] = $form_state->getValue(array('api_key'));
    $this->configuration['width'] = $form_state->getValue(
      array(
        'dimensions',
        'width',
      )
    );
    $this->configuration['height'] = $form_state->getValue(
      array(
        'dimensions',
        'height',
      )
    );
  }

}
