import routes from './routes'
import dotenv from 'dotenv'

const DOT_ENV = dotenv.config().parsed
let AXIOS_BASE_URL = DOT_ENV.DEV_BASE_URL

switch (DOT_ENV.ENVIRONMENT) {
  case 'test':
    AXIOS_BASE_URL = DOT_ENV.TEST_BASE_URL
    break

  case 'prod':
    AXIOS_BASE_URL = DOT_ENV.PROD_BASE_URL
    break

  default:
    AXIOS_BASE_URL = DOT_ENV.DEV_BASE_URL
    break
}

export default {
  mode: 'spa',
  env: DOT_ENV,

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
   ** Server
   */
  server: {
    port: 3001
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/loading.vue',

  /*
   ** Customize the Loading Indicator
   */
  loadingIndicator: '~/components/LoadingIndicator.vue',

  /*
   ** Global CSS
   */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss/global.scss'
  ],

  /*
   ** Style Resources
   */
  styleResources: {
    scss: ['./assets/scss/_variable.scss']
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/storage.js', ssr: false },
    { src: '~/plugins/toastr.js', ssr: false },
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/api.js', ssr: false },
    { src: '~/plugins/eventBus.js', ssr: false },
    { src: '~/plugins/fontawesome.js', ssr: false },
    { src: '~/plugins/vue.js', ssr: false },
    { src: '~/plugins/filters.js', ssr: false }
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
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    [
      '@nuxtjs/eslint-module',
      {
        fix: true
      }
    ],

    // Doc: https://github.com/nuxt-community/stylelint-module
    [
      '@nuxtjs/stylelint-module',
      {
        fix: true
        // files: ['assets/**/*.{s?(a|c)ss,less,stylus}']
      }
    ],

    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',

    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  // Doc: https://bootstrap-vue.js.org/docs/#nuxtjs-module
  bootstrapVue: {
    bootstrapCSS: true,
    bootstrapVueCSS: true,
    components: ['BModal', 'BPagination', 'BTooltip'],
    directives: ['VBModal', 'VBTooltip']
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:
      process.env.NODE_ENV === 'development'
        ? process.env.DEV_BASE_URL
        : AXIOS_BASE_URL,
    debug: process.env.NODE_ENV === 'development'
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
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //     options: {
      //       fix: true
      //     }
      //   })
      // }
    }
  }
}
