import dotenv from 'dotenv'
import routes from './routes'

export default {
  mode: 'spa',
  env: dotenv.config().parsed,

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/global.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/console.js',
    '~/plugins/eventBus.js',
    '~/plugins/filters.js'
  ],

  /*
   ** Router
   */
  router: {
    extendRoutes(nuxtRoutes, resolve) {
      routes.forEach((route) => {
        nuxtRoutes.push({
          name: route.name,
          path: route.path,
          component: resolve(__dirname, route.component)
        })
      })
    }
  },

  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */

  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/auth-module
    '@nuxtjs/auth',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'https://localhost:44389'
        : process.env.BASE_URL
  },

  /*
   ** Auth
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'session/login',
            method: 'post',
            propertyName: 'results.token'
          },
          user: { url: 'session/me', method: 'get', propertyName: 'results' },
          logout: { url: 'session/logout', method: 'get' }
        }
      }
    },
    redirect: {
      home: '/',
      login: '/login',
      logout: '/login'
    },
    resetOnError: true
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
