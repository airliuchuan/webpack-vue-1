import createApp from './create-app'
import bus from './bus/bus'

const {app, router, store} = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('login', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
