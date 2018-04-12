// import App from '../views/app/App.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // component: App
    component: () => import(/* webpackChunkName: "app-view" */ '../views/app/App.vue')
  },
  {
    path: '/login',
    // component: Login
    component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue')
  }
]
