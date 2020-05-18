/**
 * User State
 * https://vuex.vuejs.org/guide/state.html
 */
export const state = () => ({
  rows: [{}],
  perPage: 0,
  total: 0,
  totalPages: 0
})

/**
 * User Getters
 * https://vuex.vuejs.org/guide/getters.html
 */
export const getters = {
  /**
   * Get all Users from state
   *
   * @param {object} state
   * @return {array} rows
   */
  getUsers: (state) => {
    return state.rows
  },

  /**
   * Get the total of User
   *
   * @param {object} state
   * @return {int} total
   */
  getUsersTotal: (state) => {
    return state.total
  },

  /**
   * Get the per page of User
   *
   * @param {object} state
   * @return {int} perPage
   */
  getUsersPage: (state) => {
    return state.perPage
  }
}

/**
 * Users Mutations
 *  https://vuex.vuejs.org/guide/mutations.html
 */
export const mutations = {
  /**
   * Update the State and set the Users
   *
   * @param {object} state
   * @param {object} users
   */
  SET_USERS(state, users) {
    state.rows = users.data
    state.perPage = users.per_page
    state.total = users.total
    state.totalPages = users.total_pages
  },

  /**
   * Add user to the state
   *
   * @param {object} state
   * @param {user} object
   */
  ADD_USER(state, user) {
    state.rows.push(user)
    state.total += 1
  },

  /**
   * Update User State
   *
   * @param {object} state
   * @param {user} object
   */
  UPDATE_USER(state, user) {
    const index = state.rows.findIndex((row) => row.id === user.id)

    Object.assign(state.rows[index], user)
  },

  /**
   * Delete User State
   *
   * @param {object} state
   * @param {user} object
   */
  DELETE_USER(state, id) {
    const index = state.rows.findIndex((row) => row.id === id)

    state.rows.splice(index, 1)
    state.total -= 1
  }
}

/**
 * User Actions
 * https://vuex.vuejs.org/guide/actions.html
 */
export const actions = {
  /**
   * Search Users from the API
   *
   * @param {object} commit
   * @param {string} search
   * @param {int} page
   */
  async searchUsers({ commit }, parameters) {
    // query
    const query = {
      page: 1,
      per_page: 3
    }

    // page
    if (parameters && parameters.page) {
      query.page = parameters.page
    }

    // per page
    if (parameters && parameters.per_page) {
      query.per_page = parameters.per_page
    }

    // api call
    const response = await this.$api.user.search(query)

    commit('SET_USERS', response)
  },

  /**
   * Add User to the API
   *
   * @param {object} commit
   * @param {object} payload
   * @reject {array} errors
   * @resolve {object} results
   */
  addUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$api.user
        .create(payload)
        .then((response) => {
          if (response.error) {
            reject(response.error)
          } else {
            resolve(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Update User to the API
   *
   * @param {object} commit
   * @param {object} payload
   * @reject {array} errors
   * @resolve {object} results
   */
  updateUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$api.user
        .update(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Delete User to the API
   *
   * @param {object} commit
   * @param {int} userId
   * @reject {array} errorsaw
   * @resolve {object} results
   */
  deleteUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      this.$api.user
        .delete(userId)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
