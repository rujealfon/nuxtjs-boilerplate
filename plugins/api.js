import Auth from '~/api/auth.js'
import Product from '~/api/product.js'
import Repository from '~/repository.js'

export default ({ $axios }, inject) => {
  const API = {
    auth: new Auth($axios, '/auth'),
    product: new Product($axios, '/product'),
    profile: new Repository($axios, '/profile')
  }

  inject('api', API)
}
