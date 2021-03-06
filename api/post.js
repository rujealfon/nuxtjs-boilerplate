import Repository from '~/repository.js'

const RESOURCE = new Map([['Activate', '/activate']])

export default class Post extends Repository {
  activate(id) {
    return this.axios.$put(`${this.base}${RESOURCE.get('Activate')}/${id}`)
  }
}
