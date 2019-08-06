/**
 * Getters
 * https://vuex.vuejs.org/guide/getters.html
 */
export const getters = {
  /**
   * Check if user is logged in
   *
   * @param {object} state
   * @return {boolen}
   */
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  /**
   * Login user details
   *
   * @param {object} state
   * @return {object} user
   */
  loggedInUser(state) {
    return state.auth.user
  }
}
