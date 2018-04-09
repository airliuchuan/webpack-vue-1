export default {
  namespaced: true,
  state: {
    text: 'bbb'
  },
  mutations: {
    updateText (state, text) {
      state.text = text
    }
  },
  actions: {
    updateTextAsync ({commit, state, rootState}, {text, time}) {
      setTimeout(() => {
        commit('updateText', text + rootState.first)
      }, time)
    },
    updateCountAsync ({commit, state, rootState}) {
      commit('updateCount', state.text, {root: true})
    }
  },
  getters: {
    // 可以使用全局的getters和全局state
    _text: (state, getters, rootState) => state.text + 'b-getters '
  }
}
