import Product from '~/api/product.js'
import Repository from '~/repository.js'

export default ({ $axios }, inject) => {
  const API = {
    product: new Product($axios, '/product'),
    profile: new Repository($axios, '/profile')
  }

  inject('api', API)
}
