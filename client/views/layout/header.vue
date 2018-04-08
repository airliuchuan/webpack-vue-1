<template>
  <div :style="[s1, s2, {border: '1px solid #000'}]">
    <p v-pre>{{obj.a}}</p>
    obj.a: <input type="text" v-model="obj.a">
    <input type="checkbox" v-model="active">
    <render :renText="text"></render>
  </div>
</template>
<script>

import Render from './render.vue'
export default {
  components: {
    Render
  },
  data () {
    return {
      text: 'renText',
      s1: {
        fontSize: '20px'
      },
      s2: {
        color: 'blue',
        appearance: 'none'
      },
      obj: {
        a: 1
      },
      active: ''
    }
  },
  mounted () {
    // 这种方式会触发watch监听
    // this.obj = {
    //   a: 2
    // }
    // 这种不会
    this.obj.a = 3
  },
  watch: {
    // obj: {
    //   handler (newData, oldData) {
    //     console.log('obj.a change')
    //   },
    //   immediate: true // 立即执行watch
    //   deep: true // 为true时候, watch会递归循环obj里的说有属性, 性能低
    // }
    // 这种方式可以监听obj的属性, 性能高, 用字符串里去写对象的深入调用
    'obj.a': () => {
      console.log('obj.a change')
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  color: #f00
</style>
