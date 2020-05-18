/**
 * Post State
 * https://vuex.vuejs.org/guide/state.html
 */
export const state = () => ({
  rows: [{}],
  total: 100
})

/**
 * Post Getters
 * https://vuex.vuejs.org/guide/getters.html
 */
export const getters = {
  /**
   * Get all Posts from state
   *
   * @param {object} state
   * @return {array} rows
   */
  getPost: (state) => {
    return state.rows
  },

  /**
   * Get the total of Post
   *
   * @param {object} state
   * @return {int} total
   */
  getPostTotal: (state) => {
    return state.total
  }
}

/**
 * Post Mutations
 *  https://vuex.vuejs.org/guide/mutations.html
 */
export const mutations = {
  /**
   * Update the State and set the Post
   *
   * @param {object} state
   * @param {object} post
   */
  SET_POST(state, post) {
    state.rows = post
    // state.total = post.count
  },

  /**
   * Update Post State
   *
   * @param {object} state
   * @param {post} object
   */
  UPDATE_POST(state, post) {
    const index = state.rows.findIndex((row) => row.id === post.id)

    Object.assign(state.rows[index], post)
  },

  /**
   * Delete Post State
   *
   * @param {object} state
   * @param {post} object
   */
  DELETE_POST(state, id) {
    const index = state.rows.findIndex((row) => row.id === id)

    state.rows.splice(index, 1)
    state.total -= 1
  }
}

/**
 * Branch Actions
 * https://vuex.vuejs.org/guide/actions.html
 */
export const actions = {
  /**
   * Search Posts from the API
   *
   * @param {object} commit
   * @param {string} search
   * @param {int} page
   */
  async searchPost({ commit }, parameters) {
    // query
    const query = {
      _page: 1,
      _limit: 10
    }

    // page
    if (parameters && parameters._page) {
      query._page = parameters._page
    }

    // limit
    if (parameters && parameters._limit) {
      query._limit = parameters._limit
    }

    // api call
    const response = await this.$api.post.search(query)

    commit('SET_POST', response)
  },

  /**
   * Add Post to the API
   *
   * @param {object} commit
   * @param {object} payload
   * @reject {array} errors
   * @resolve {object} results
   */
  addPost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$api.post
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
   * Update Post to the API
   *
   * @param {object} commit
   * @param {object} payload
   * @reject {array} errors
   * @resolve {object} results
   */
  updatePost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$api.post
        .update(payload)
        .then((response) => {
          commit('UPDATE_POST', response)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   * Delete Post to the API
   *
   * @param {object} commit
   * @param {int} postId
   * @reject {array} errorsaw
   * @resolve {object} results
   */
  deletePost({ commit }, postId) {
    return new Promise((resolve, reject) => {
      this.$api.post
        .delete(postId)
        .then((response) => {
          commit('DELETE_POST', postId)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
