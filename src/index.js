import Vue from 'vue'
import App from './app.vue'
import '@assets/css/reset.styl'
import '@assets/img/1128849.png'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: h => h(App)
}).$mount(root)