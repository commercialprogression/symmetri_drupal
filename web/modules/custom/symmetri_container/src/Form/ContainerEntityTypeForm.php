<?php

namespace Drupal\symmetri_container\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ContainerEntityTypeForm.
 */
class ContainerEntityTypeForm extends EntityForm {

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $container_entity_type = $this->entity;
    $form['label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label'),
      '#maxlength' => 255,
      '#default_value' => $container_entity_type->label(),
      '#description' => $this->t("Label for the Container type."),
      '#required' => TRUE,
    ];

    $form['id'] = [
      '#type' => 'machine_name',
      '#default_value' => $container_entity_type->id(),
      '#machine_name' => [
        'exists' => '\Drupal\symmetri_container\Entity\ContainerEntityType::load',
      ],
      '#disabled' => !$container_entity_type->isNew(),
    ];

    /* You will need additional form elements for your custom properties. */

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $container_entity_type = $this->entity;
    $status = $container_entity_type->save();

    switch ($status) {
      case SAVED_NEW:
        $this->messenger()->addMessage($this->t('Created the %label Container type.', [
          '%label' => $container_entity_type->label(),
        ]));
        break;

      default:
        $this->messenger()->addMessage($this->t('Saved the %label Container type.', [
          '%label' => $container_entity_type->label(),
        ]));
    }
    $form_state->setRedirectUrl($container_entity_type->toUrl('collection'));
  }

}
