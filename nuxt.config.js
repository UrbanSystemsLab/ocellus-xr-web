// const dotenv = require('dotenv').config()

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)

  head: {
    title: 'USL Equity AR Nuxt App',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'USL Equity AR Nuxt App',
      content: 'USL Equity AR Nuxt App'
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
    '@/assets/fonts/ibm-plex-sans.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  env: {
    privateRuntimeConfig: {
      MapboxAPIKey: process.env.MB_ACCESS_TOKEN
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  }
};
