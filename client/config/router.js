import VueRouter from 'vue-router'
import routes from './routes.js'

export default () => {
  return new VueRouter({
    mode: 'history',
    routes
    // base: '/base/'
  })
}
