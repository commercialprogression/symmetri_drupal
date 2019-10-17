<?php

namespace Drupal\symmetri_container\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Container entities.
 */
class ContainerEntityViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.
    return $data;
  }

}
