export default ({ app }, inject) => {
  inject('console', (name, log) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(name, log)
    }
  })
}
