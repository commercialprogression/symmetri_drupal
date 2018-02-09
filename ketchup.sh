#!/bin/bash

# Pull dat code.
git pull origin master

# Get us to the right directory.
cd web

# Sync config
../vendor/bin/drush cim -y

# Update the db
../vendor/bin/drush updb

# Update entities
../vendor/bin/drush entup

# Rebuild cache
../vendor/bin/drush cr

# Back out to root
cd ../
