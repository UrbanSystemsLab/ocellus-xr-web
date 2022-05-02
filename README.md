# equity-ar-nuxt

## Build Setup

```bash
# install dependencies
$ npm install

# Create .env at the root of the repo containing environment variables with the following terminal command:
./create-env-file.sh
# Provide your own environment variables
# If you run into any issues such as "permission denied", type:
chmod u+x ./create-env-file.sh
# then run ./create-env-file.sh again.

# serve with hot reload at localhost:3000
$ npm run dev

```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Heroku Deployment

- App URL: https://ocellus-xr.herokuapp.com/
- Dashboard: https://dashboard.heroku.com/apps/ocellus-xr
- Requires the following Config Vars to be set under https://dashboard.heroku.com/apps/ocellus-xr/settings
```
FIREBASE_DEV_APP_ID: 1:...8c
FIREBASE_DEV_AUTHDOMAIN: usl-nyc-portal-prod.firebaseapp.com
FIREBASE_DEV_ID: usl-nyc-portal-prod
FIREBASE_DEV_KEY: A...I
FIREBASE_DEV_SENDER_ID: 6...9
FIREBASE_DEV_STORAGE: usl-nyc-portal-prod.appspot.com
FIREBASE_DEV_URL: https://usl-nyc-portal-prod.firebaseio.com
HOST: 0.0.0.0
MB_ACCESS_TOKEN: pk....w
MB_USERNAME: equity
```
Contact USL Admin for credentials via developer@urbansystemslab.com

### Heroku CLI

Follow these instructions to get Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

- Authenticate with `heroku login`
Authentication details will be provided in a secure channel

- Push changes to heroku `git push heroku main`
The URL will be shown after deploying to Heroku