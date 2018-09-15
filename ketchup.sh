#!/bin/bash

# Pull dat code.
git pull

# Run composer
php composer install

# Get us to the right directory.
cd web

# Clear caches to not upset config_split
../vendor/bin/drush cr

# Sync config
../vendor/bin/drush cim -y

# Update the db
../vendor/bin/drush updb

# Update entities
../vendor/bin/drush entup

# Uninstall simplesamlphp_auth
# Uncomment line below if simplesamlphp_auth is installed
#../vendor/bin/drush pmu simplesamlphp_auth

# Clear cache again
../vendor/bin/drush cr

# Back to where it all started.
cd ..
