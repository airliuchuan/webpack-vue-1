<template>
  <div class="text">
    <Header></Header>
    {{text}}
    <img src="@assets/img/mo2.png" alt="">
    <test-jsx></test-jsx>
  </div>
</template>
<script>
import TestJsx from './views/test.jsx'
import Header from './views/layout/header.vue'
export default {
  components: {
    TestJsx,
    Header
  },
  data () {
    return {
      text: 'abcdssdfdsfds'
    }
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
