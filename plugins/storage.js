import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'nuxtjs-boilerplate',
    paths: ['auth']
  })(store)
}
