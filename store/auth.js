/**
 * Auth State
 * https://vuex.vuejs.org/guide/state.html
 */
export const state = () => ({
  token: '',
  user: {},
  loggedIn: false
})

/**
 * Auth Getters
 * https://vuex.vuejs.org/guide/getters.html
 */
export const getters = {
  /**
   * Get token
   *
   * @param {object} state
   * @return {string} token
   */
  getToken: (state) => {
    return state.token
  },

  /**
   * Get user
   *
   * @param {object} state
   * @return {object} user
   */
  getUser: (state) => {
    return state.user
  },

  /**
   * Get Logged In
   *
   * @param {object} state
   * @return {boolen}
   */
  getLoggedIn: (state) => {
    return state.loggedIn
  }
}

/**
 * Auth Mutations
 * https://vuex.vuejs.org/guide/mutations.html
 */
export const mutations = {
  /**
   * Update the state and set the token
   *
   * @param {object} state
   * @param {string} token
   */
  SET_TOKEN(state, token) {
    state.token = token
  },

  /**
   * Update the state and set the user
   *
   * @param {object} state
   * @param {object} user
   */
  SET_USER(state, user) {
    state.user = user
  },

  /**
   * Update the state and set the value
   *
   * @param {object} state
   * @param boolean
   */
  SET_LOGGED_IN(state, value) {
    state.loggedIn = value
  }
}

/**
 * Auth Actions
 * https://vuex.vuejs.org/guide/actions.html
 */
export const actions = {
  /**
   * Clear
   *
   * @param {object} commit
   */
  clear({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_USER', {})
    commit('SET_LOGGED_IN', false)
  },

  /**
   * Login
   *
   * @param {object} commit
   *
   * @reject {array} errors
   * @resolve {object} results
   */
  login({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      this.$api.auth
        .login()
        .then((response) => {
          commit('SET_USER', response.results)
          commit('SET_LOGGED_IN', true)
          resolve(response)
        })
        .catch((error) => {
          dispatch('clear')
          reject(error)
        })
    })
  },

  /**
   * User
   *
   * @param {object} commit
   *
   * @reject {array} errors
   * @resolve {object} results
   */
  user({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      this.$api.auth
        .user()
        .then((response) => {
          commit('SET_USER', response.results)
          commit('SET_LOGGED_IN', true)
          resolve(response)
        })
        .catch((error) => {
          dispatch('clear')
          reject(error)
        })
    })
  },

  /**
   * Logout
   *
   * @param {object} commit
   */
  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      this.$api.auth
        .logout()
        .then((response) => {
          dispatch('clear')
          resolve(response)
        })
        .catch((error) => {
          dispatch('clear')
          reject(error)
        })
    })
  }
}
