import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import '@assets/css/reset.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.fullPath === '/app') next({path: '/login', replace: true})
//   else next()
// })

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})
