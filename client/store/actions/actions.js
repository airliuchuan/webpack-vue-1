// import model from '../../model/client-model'
import model from 'model'
import bus from '../../bus/bus'

const handleError = err => {
  if (err.code === 401) {
    // console.log(err.message)
    bus.$emit('login')
  }
}

export default {
  updateCountAsync (store, count) {
    setTimeout(() => {
      store.commit('updateCount', count)
    }, 1000)
  },
  fetchAll ({commit}) {
    commit('startLoading')
    return model.getAll()
      .then(data => {
        commit('stopLoading')
        commit('allArticles', data)
      })
      .catch(err => {
        // console.log(err.code)
        commit('stopLoading')
        handleError(err)
      })
  },
  login ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          console.log(data)
          commit('doLogin', data)
          resolve()
        }).catch(err => {
          handleError(err)
          reject(err)
        })
    })
  }
}
