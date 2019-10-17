<?php

namespace Drupal\symmetri_container;

use Drupal\Core\Entity\ContentEntityStorageInterface;
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
interface ContainerEntityStorageInterface extends ContentEntityStorageInterface {

  /**
   * Gets a list of Container revision IDs for a specific Container.
   *
   * @param \Drupal\symmetri_container\Entity\ContainerEntityInterface $entity
   *   The Container entity.
   *
   * @return int[]
   *   Container revision IDs (in ascending order).
   */
  public function revisionIds(ContainerEntityInterface $entity);

  /**
   * Gets a list of revision IDs having a given user as Container author.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The user entity.
   *
   * @return int[]
   *   Container revision IDs (in ascending order).
   */
  public function userRevisionIds(AccountInterface $account);

  /**
   * Counts the number of revisions in the default language.
   *
   * @param \Drupal\symmetri_container\Entity\ContainerEntityInterface $entity
   *   The Container entity.
   *
   * @return int
   *   The number of revisions in the default language.
   */
  public function countDefaultLanguageRevisions(ContainerEntityInterface $entity);

  /**
   * Unsets the language for all Container with the given language.
   *
   * @param \Drupal\Core\Language\LanguageInterface $language
   *   The language object.
   */
  public function clearRevisionsLanguage(LanguageInterface $language);

}
