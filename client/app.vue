<template>
  <div class="text">
    <Header></Header>
    {{text}}
    <img src="@assets/img/mo2.png" alt="">
    <div><input type="text" v-model="value"></div>
    <test-jsx></test-jsx>
  </div>
</template>
<script>
import TestJsx from './views/test.jsx'
import Header from './views/layout/header.vue'
export default {
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      data
    }
  },
  components: {
    TestJsx,
    Header
  },
  data () {
    return {
      text: 'abcdssdfdsfds',
      value: '123'
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
