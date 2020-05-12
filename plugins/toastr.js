import Vue from 'vue'
import VueToastr from 'vue-toastr'

/**
 * Vue Toast plugin
 * https://github.com/s4l1h/vue-toastr
 */
Vue.use(VueToastr, {
  defaultTimeout: 5000
})

export default ({ app }, inject) => {
  inject('toastr', Vue.prototype.$toastr)
}
