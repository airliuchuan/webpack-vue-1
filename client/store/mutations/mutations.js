export default {
  updateCount (state, count) {
    state.count = count
  },
  allArticles (state, data) {
    state.articles = data
  },
  doLogin (state, data) {
    state.user = data
  },
  startLoading (state) {
    state.loading = true
  },
  stopLoading (state) {
    state.loading = false
  }
}
