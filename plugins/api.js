import Auth from '~/api/auth.js'
import Post from '~/api/post.js'
import User from '~/api/user.js'
import Repository from '~/repository.js'

export default ({ $axios }, inject) => {
  const API = {
    auth: new Auth($axios, '/auth'),
    post: new Post($axios, '/posts'),
    user: new User($axios, '/users'),
    profile: new Repository($axios, '/profile')
  }

  inject('api', API)
}
