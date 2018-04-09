<template>
  <div class="text">
    <Header></Header>
    <router-link to="/login">login</router-link>
    <router-link to="/app">app</router-link>
    <router-link to="/store">store</router-link>
    <router-view></router-view>
    <footer-jsx></footer-jsx>
  </div>
</template>
<script>
import FooterJsx from './views/layout/footer.jsx'
import Header from './views/layout/header.vue'
export default {
  components: {
    FooterJsx,
    Header
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .text
    color: red
    img
      border-radius: 50%
      transform: translateX(200px)
</style>
