import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'

import './assets/css/reset.styl'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Meta)

export default () => {
  // 每次都要返回一个新的store和router
  const store = createStore()
  const router = createRouter()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return {app, router, store}
}
