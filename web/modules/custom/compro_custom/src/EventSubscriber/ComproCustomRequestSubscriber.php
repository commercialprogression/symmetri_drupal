<?php

namespace Drupal\compro_custom\EventSubscriber;

use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ComproCustomRequestSubscriber implements EventSubscriberInterface {

  public function checkForRedirection(GetResponseEvent $event) {
    $parameters = \Drupal::routeMatch()->getParameters()->all();
    $route_name = \Drupal::routeMatch()->getRouteName();

    $pdf_url = FALSE;
    if (isset($parameters['node'])) {
      $node = $parameters['node'];
      if ($node->bundle() === 'resource') {
        if ($node->hasField('field_document')) {
          $document = $node->get('field_document')->referencedEntities();
          if (isset($document[0])) {
            $pdf_file = $document[0]->get('field_media_file')->getValue();
            if (isset($pdf_file[0]['target_id'])) {
              $file = \Drupal::entityTypeManager()->getStorage('file')->load($pdf_file[0]['target_id']);
              $private_uri = $file->getFileUri();
              $pdf_url = file_create_url($private_uri);
            }
          }
        }
      }

      if ($pdf_url && $route_name == 'entity.node.canonical') {
        \Drupal::service('page_cache_kill_switch')->trigger();
        $event->setResponse(new RedirectResponse($pdf_url));
      }
    }
  }

  /**
  * {@inheritdoc}
  */
  public static function getSubscribedEvents() {
    // Set priority over dynamic and other page caches (27+).
    $events[KernelEvents::REQUEST][] = ['checkForRedirection', 30];
    return $events;
  }

}
