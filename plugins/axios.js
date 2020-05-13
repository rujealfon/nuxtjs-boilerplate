export default function({ $axios, app, store }) {
  const { $toastr } = app

  $axios.onRequest((config) => {
    // log the token
    console.log('Token:', store.getters['auth/getToken'])

    // check if we already have token
    if (store.getters['auth/getToken']) {
      // set the authentication bearer
      config.headers.common.Authorization = `Bearer ${store.getters['auth/getToken']}`
    }
  })

  $axios.onError((error) => {
    // get the error code
    const code = parseInt(error.response && error.response.status)

    if (typeof error.response === 'undefined' || code === 401) {
      // display the error
      $toastr.e('Session Expired')

      // clear the auth in the store
      store.dispatch('auth/clear')

      // redirect
      // window.location.replace(`${window.location.origin}/login`)
    }
  })
}
