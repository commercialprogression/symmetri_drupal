<?php

/**
 * @file
 * Contains container_entity.page.inc.
 *
 * Page callback for Container entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Container templates.
 *
 * Default template: container_entity.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_container_entity(array &$variables) {
  // Fetch ContainerEntity Entity Object.
  $container_entity = $variables['elements']['#container_entity'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
