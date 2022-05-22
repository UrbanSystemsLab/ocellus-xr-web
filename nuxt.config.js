/*
** Environment Variables 
*/ 
const dotenv = require('dotenv').config()

let env = process.env.NODE_ENV || 'dev'
let firebaseConfig
let mapboxAccessToken

firebaseConfig = {
  apiKey: process.env.FIREBASE_DEV_KEY,
  authDomain: process.env.FIREBASE_DEV_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DEV_URL,
  projectId: process.env.FIREBASE_DEV_ID,
  storageBucket: process.env.FIREBASE_DEV_STORAGE,
  messagingSenderId: process.env.FIREBASE_DEV_SENDER_ID,
  appId: process.env.FIREBASE_DEV_APP_ID
}

export default {
  env: {
    firebaseConfig: firebaseConfig
  },
  // Runtime config variables go here (https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/#what-are-environment-variables)
  // publicRuntimeConfig: {
    
  // },
  // privateRuntimeConfig: {
  //   NODE_ENV: env,
  //   MapboxAPIKey: process.env.MB_ACCESS_TOKEN,
  //   firebaseConfig: firebaseConfig
  // },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'OCELLUS XR',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'OCELLUS XR',
      content: 'OCELLUS XR'
    }],
    script: [{
      src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
    }, {
      src: 'https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.js'
    }, {
      src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
    }],
    link: [{
      rel: 'stylesheet',
      href: 'https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css'
    }, {
      rel: 'icon',
      type: 'image/ico',
      href: '/favicon.ico'
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/fonts/ibm-plex-sans.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/event-bus',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },
};