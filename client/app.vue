<template>
  <div class="text">
    <Header></Header>
    <router-link to="/login">login</router-link>
    <router-link to="/app">app</router-link>
    <router-view></router-view>
    <footer-jsx></footer-jsx>
    <div id="loading" v-show="loading">
      <loading/>
    </div>
  </div>
</template>
<script>
import FooterJsx from './layout/footer.jsx'
import Header from './layout/header.vue'
import Loading from './components/loading/loading.vue'
import {
  mapState
} from 'vuex'
export default {
  metaInfo: {
    title: 'kay\'s app'
  },
  computed: {
    ...mapState(['loading'])
  },
  components: {
    FooterJsx,
    Header,
    Loading
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
#loading
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  justify-content: center
  align-items: center
  z-index: 1000
</style>
