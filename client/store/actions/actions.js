export default {
  updateCountAsync (store, count) {
    setTimeout(() => {
      store.commit('updateCount', count)
    }, 1000)
  }
}
