#!/usr/bin/env bash

# Exit the script as soon as something fails.
set -e

if [ ! -f ./.env ];

then
  echo "Creating enviornment variables template file. ./.env "

  ENV_VARS='
  FIREBASE_DEV_KEY=""
  FIREBASE_DEV_DOMAIN=""
  FIREBASE_DEV_ID=""
  FIREBASE_DEV_BUCKET=""
  FIREBASE_DEV_SENDER_ID=""
  FIREBASE_DEV_APP_ID=""

  MAPBOX_DEV_TOKEN=""

  '
  > .env

  echo "${ENV_VARS}" > .env

  echo "Done"
  echo "Make sure to edit it and provide your own keys."

else
  echo ".env file already exists. I won't overwrite it."
fi
