<?php

namespace Drupal\symmetri_container;

use Drupal\Core\Entity\Sql\SqlContentEntityStorage;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Language\LanguageInterface;
use Drupal\symmetri_container\Entity\ContainerEntityInterface;

/**
 * Defines the storage handler class for Container entities.
 *
 * This extends the base storage class, adding required special handling for
 * Container entities.
 *
 * @ingroup symmetri_container
 */
class ContainerEntityStorage extends SqlContentEntityStorage implements ContainerEntityStorageInterface {

  /**
   * {@inheritdoc}
   */
  public function revisionIds(ContainerEntityInterface $entity) {
    return $this->database->query(
      'SELECT vid FROM {container_entity_revision} WHERE id=:id ORDER BY vid',
      [':id' => $entity->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function userRevisionIds(AccountInterface $account) {
    return $this->database->query(
      'SELECT vid FROM {container_entity_field_revision} WHERE uid = :uid ORDER BY vid',
      [':uid' => $account->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function countDefaultLanguageRevisions(ContainerEntityInterface $entity) {
    return $this->database->query('SELECT COUNT(*) FROM {container_entity_field_revision} WHERE id = :id AND default_langcode = 1', [':id' => $entity->id()])
      ->fetchField();
  }

  /**
   * {@inheritdoc}
   */
  public function clearRevisionsLanguage(LanguageInterface $language) {
    return $this->database->update('container_entity_revision')
      ->fields(['langcode' => LanguageInterface::LANGCODE_NOT_SPECIFIED])
      ->condition('langcode', $language->getId())
      ->execute();
  }

}
