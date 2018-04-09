export default {
  state: {
    text: 'aaaa'
  },
  mutations: {
    updateText (state, text) {
      state.text = text
    }
  },
  actions: {
    updateTextAsync ({commit}, {text, time}) {
      setTimeout(() => {
        commit('updateText', text)
      }, time)
    }
  },
  getters: {
    _text: state => state.text + '-getter------'
  }
}
