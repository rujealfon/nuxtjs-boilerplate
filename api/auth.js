import Repository from '~/repository.js'

const RESOURCE = new Map([
  ['Login', '/login'],
  ['Logout', '/logout'],
  ['Me', '/me']
])

export default class Auth extends Repository {
  login(payload) {
    return this.axios.$post(`${this.base}${RESOURCE.get('Login')}`, payload)
  }

  logout() {
    return this.axios.$get(`${this.base}${RESOURCE.get('Logout')}`)
  }

  user() {
    return this.axios.$get(`${this.base}${RESOURCE.get('Me')}`)
  }
}
