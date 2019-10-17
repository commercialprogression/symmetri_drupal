<?php

namespace Drupal\symmetri_container\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\RevisionLogInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\Core\Entity\EntityPublishedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Container entities.
 *
 * @ingroup symmetri_container
 */
interface ContainerEntityInterface extends ContentEntityInterface, RevisionLogInterface, EntityChangedInterface, EntityPublishedInterface, EntityOwnerInterface {

  /**
   * Add get/set methods for your configuration properties here.
   */

  /**
   * Gets the Container name.
   *
   * @return string
   *   Name of the Container.
   */
  public function getName();

  /**
   * Sets the Container name.
   *
   * @param string $name
   *   The Container name.
   *
   * @return \Drupal\symmetri_container\Entity\ContainerEntityInterface
   *   The called Container entity.
   */
  public function setName($name);

  /**
   * Gets the Container creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Container.
   */
  public function getCreatedTime();

  /**
   * Sets the Container creation timestamp.
   *
   * @param int $timestamp
   *   The Container creation timestamp.
   *
   * @return \Drupal\symmetri_container\Entity\ContainerEntityInterface
   *   The called Container entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Gets the Container revision creation timestamp.
   *
   * @return int
   *   The UNIX timestamp of when this revision was created.
   */
  public function getRevisionCreationTime();

  /**
   * Sets the Container revision creation timestamp.
   *
   * @param int $timestamp
   *   The UNIX timestamp of when this revision was created.
   *
   * @return \Drupal\symmetri_container\Entity\ContainerEntityInterface
   *   The called Container entity.
   */
  public function setRevisionCreationTime($timestamp);

  /**
   * Gets the Container revision author.
   *
   * @return \Drupal\user\UserInterface
   *   The user entity for the revision author.
   */
  public function getRevisionUser();

  /**
   * Sets the Container revision author.
   *
   * @param int $uid
   *   The user ID of the revision author.
   *
   * @return \Drupal\symmetri_container\Entity\ContainerEntityInterface
   *   The called Container entity.
   */
  public function setRevisionUserId($uid);

}
