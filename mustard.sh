#!/bin/bash

# Pull dat code.
git pull

# Run composer
lando composer install

# Clear caches to not upset config_split
lando drush cr

# Sync config
lando drush cim -y

# Update the db
lando drush updb

# Update entities
lando drush entup

# Uninstall simplesamlphp_auth
# Uncomment line below if simplesamlphp_auth is installed
#lando drush pmu simplesamlphp_auth

# Clear cache again
lando drush cr
