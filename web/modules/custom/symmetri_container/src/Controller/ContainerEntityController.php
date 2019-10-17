<?php

namespace Drupal\symmetri_container\Controller;

use Drupal\Component\Utility\Xss;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Datetime\DateFormatter;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Render\Renderer;
use Drupal\Core\Url;
use Drupal\symmetri_container\Entity\ContainerEntityInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class ContainerEntityController.
 *
 *  Returns responses for Container routes.
 */
class ContainerEntityController extends ControllerBase implements ContainerInjectionInterface {


  /**
   * The date formatter.
   *
   * @var \Drupal\Core\Datetime\DateFormatter
   */
  protected $dateFormatter;

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\Renderer
   */
  protected $renderer;

  /**
   * Constructs a new ContainerEntityController.
   *
   * @param \Drupal\Core\Datetime\DateFormatter $date_formatter
   *   The date formatter.
   * @param \Drupal\Core\Render\Renderer $renderer
   *   The renderer.
   */
  public function __construct(DateFormatter $date_formatter, Renderer $renderer) {
    $this->dateFormatter = $date_formatter;
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('date.formatter'),
      $container->get('renderer')
    );
  }

  /**
   * Displays a Container revision.
   *
   * @param int $container_entity_revision
   *   The Container revision ID.
   *
   * @return array
   *   An array suitable for drupal_render().
   */
  public function revisionShow($container_entity_revision) {
    $container_entity = $this->entityTypeManager()->getStorage('container_entity')
      ->loadRevision($container_entity_revision);
    $view_builder = $this->entityTypeManager()->getViewBuilder('container_entity');

    return $view_builder->view($container_entity);
  }

  /**
   * Page title callback for a Container revision.
   *
   * @param int $container_entity_revision
   *   The Container revision ID.
   *
   * @return string
   *   The page title.
   */
  public function revisionPageTitle($container_entity_revision) {
    $container_entity = $this->entityTypeManager()->getStorage('container_entity')
      ->loadRevision($container_entity_revision);
    return $this->t('Revision of %title from %date', [
      '%title' => $container_entity->label(),
      '%date' => $this->dateFormatter->format($container_entity->getRevisionCreationTime()),
    ]);
  }

  /**
   * Generates an overview table of older revisions of a Container.
   *
   * @param \Drupal\symmetri_container\Entity\ContainerEntityInterface $container_entity
   *   A Container object.
   *
   * @return array
   *   An array as expected by drupal_render().
   */
  public function revisionOverview(ContainerEntityInterface $container_entity) {
    $account = $this->currentUser();
    $container_entity_storage = $this->entityTypeManager()->getStorage('container_entity');

    $langcode = $container_entity->language()->getId();
    $langname = $container_entity->language()->getName();
    $languages = $container_entity->getTranslationLanguages();
    $has_translations = (count($languages) > 1);
    $build['#title'] = $has_translations ? $this->t('@langname revisions for %title', ['@langname' => $langname, '%title' => $container_entity->label()]) : $this->t('Revisions for %title', ['%title' => $container_entity->label()]);

    $header = [$this->t('Revision'), $this->t('Operations')];
    $revert_permission = (($account->hasPermission("revert all container revisions") || $account->hasPermission('administer container entities')));
    $delete_permission = (($account->hasPermission("delete all container revisions") || $account->hasPermission('administer container entities')));

    $rows = [];

    $vids = $container_entity_storage->revisionIds($container_entity);

    $latest_revision = TRUE;

    foreach (array_reverse($vids) as $vid) {
      /** @var \Drupal\symmetri_container\ContainerEntityInterface $revision */
      $revision = $container_entity_storage->loadRevision($vid);
      // Only show revisions that are affected by the language that is being
      // displayed.
      if ($revision->hasTranslation($langcode) && $revision->getTranslation($langcode)->isRevisionTranslationAffected()) {
        $username = [
          '#theme' => 'username',
          '#account' => $revision->getRevisionUser(),
        ];

        // Use revision link to link to revisions that are not active.
        $date = $this->dateFormatter->format($revision->getRevisionCreationTime(), 'short');
        if ($vid != $container_entity->getRevisionId()) {
          $link = $this->l($date, new Url('entity.container_entity.revision', [
            'container_entity' => $container_entity->id(),
            'container_entity_revision' => $vid,
          ]));
        }
        else {
          $link = $container_entity->link($date);
        }

        $row = [];
        $column = [
          'data' => [
            '#type' => 'inline_template',
            '#template' => '{% trans %}{{ date }} by {{ username }}{% endtrans %}{% if message %}<p class="revision-log">{{ message }}</p>{% endif %}',
            '#context' => [
              'date' => $link,
              'username' => $this->renderer->renderPlain($username),
              'message' => [
                '#markup' => $revision->getRevisionLogMessage(),
                '#allowed_tags' => Xss::getHtmlTagList(),
              ],
            ],
          ],
        ];
        $row[] = $column;

        if ($latest_revision) {
          $row[] = [
            'data' => [
              '#prefix' => '<em>',
              '#markup' => $this->t('Current revision'),
              '#suffix' => '</em>',
            ],
          ];
          foreach ($row as &$current) {
            $current['class'] = ['revision-current'];
          }
          $latest_revision = FALSE;
        }
        else {
          $links = [];
          if ($revert_permission) {
            $links['revert'] = [
              'title' => $this->t('Revert'),
              'url' => $has_translations ?
              Url::fromRoute('entity.container_entity.translation_revert', [
                'container_entity' => $container_entity->id(),
                'container_entity_revision' => $vid,
                'langcode' => $langcode,
              ]) :
              Url::fromRoute('entity.container_entity.revision_revert', [
                'container_entity' => $container_entity->id(),
                'container_entity_revision' => $vid,
              ]),
            ];
          }

          if ($delete_permission) {
            $links['delete'] = [
              'title' => $this->t('Delete'),
              'url' => Url::fromRoute('entity.container_entity.revision_delete', [
                'container_entity' => $container_entity->id(),
                'container_entity_revision' => $vid,
              ]),
            ];
          }

          $row[] = [
            'data' => [
              '#type' => 'operations',
              '#links' => $links,
            ],
          ];
        }

        $rows[] = $row;
      }
    }

    $build['container_entity_revisions_table'] = [
      '#theme' => 'table',
      '#rows' => $rows,
      '#header' => $header,
    ];

    return $build;
  }

}
