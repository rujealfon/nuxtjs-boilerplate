export default class Repository {
  constructor(_axios, _base) {
    this.axios = _axios
    this.base = _base
  }

  search(params) {
    return this.axios.$get(`${this.base}/search`, { params })
  }

  create(payload) {
    return this.axios.$post(`${this.base}/create`, payload)
  }

  update(id, payload) {
    return this.axios.$put(`${this.base}/update/${id}`, payload)
  }

  detail(id) {
    return this.axios.$get(`${this.base}/detail/${id}`)
  }

  remove(id) {
    return this.axios.$delete(`${this.base}/remove/${id}`)
  }

  restore(id) {
    return this.axios.$put(`${this.base}/restore/${id}`)
  }
}
