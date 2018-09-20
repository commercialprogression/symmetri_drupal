# Symmetri Drupal base install

This project extends the [Platform.sh](http://platform.sh) composer-based install.
It contains too many contrib and custom modules, to hit the ground running.

## Getting started

Clone this repo into your new site directory
e.g. 'git clone git@github.com:commercialprogression/symmetri_drupal.git new_site'
Run 'cd new_site' replacing 'new_site' with the name of your directory.
Then, remove the .git folder e.g. 'rm -rf .git'

Set up your local environment and install your new site.
Run 'docker-compose up' to start your server and create your database.
Run 'composer install' to download core and contrib modules.
Run 'cd web' then run 
'../vendor/bin/drush si symmetri_drupal --account-name=maintenance --account-pass=CHANGEME --site-name=new_site'

A lando file with mustard script has been copy+pasted; use at your own risk.
