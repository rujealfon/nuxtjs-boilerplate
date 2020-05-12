// https://github.com/nuxt/nuxt.js/issues/1139#issuecomment-377665136
import Vue from 'vue'

const eventBus = {}

eventBus.install = (Vue) => {
  Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)
