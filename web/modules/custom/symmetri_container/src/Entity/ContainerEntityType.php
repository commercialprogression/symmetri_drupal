<?php

namespace Drupal\symmetri_container\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBundleBase;

/**
 * Defines the Container type entity.
 *
 * @ConfigEntityType(
 *   id = "container_entity_type",
 *   label = @Translation("Container type"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\symmetri_container\ContainerEntityTypeListBuilder",
 *     "form" = {
 *       "add" = "Drupal\symmetri_container\Form\ContainerEntityTypeForm",
 *       "edit" = "Drupal\symmetri_container\Form\ContainerEntityTypeForm",
 *       "delete" = "Drupal\symmetri_container\Form\ContainerEntityTypeDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\symmetri_container\ContainerEntityTypeHtmlRouteProvider",
 *     },
 *   },
 *   config_prefix = "container_entity_type",
 *   admin_permission = "administer site configuration",
 *   bundle_of = "container_entity",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/container_entity_type/{container_entity_type}",
 *     "add-form" = "/admin/structure/container_entity_type/add",
 *     "edit-form" = "/admin/structure/container_entity_type/{container_entity_type}/edit",
 *     "delete-form" = "/admin/structure/container_entity_type/{container_entity_type}/delete",
 *     "collection" = "/admin/structure/container_entity_type"
 *   }
 * )
 */
class ContainerEntityType extends ConfigEntityBundleBase implements ContainerEntityTypeInterface {

  /**
   * The Container type ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The Container type label.
   *
   * @var string
   */
  protected $label;

}
