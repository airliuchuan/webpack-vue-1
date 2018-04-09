<template>
  <div>
    <p>i am content: {{count}}</p>
    <button @click="handleAction">action</button><br>
    <button @click="handleMutation">mutation</button>
  </div>
</template>
<script>
export default {
  // 相同路由参数之间互相切换时触发
  beforeRouteUpdate (to, from, next) {
    console.log('update')
    next()
  },
  props: ['id'],
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    handleMutation () {
      this.$store.commit('updateCount', 1)
    },
    handleAction () {
      this.$store.dispatch('updateCountAsync', 10)
    }
  },
  mounted () {
    console.log(this.$store.state.count)
    console.log(this.$store.getters.fullName)
  }
}
</script>
<style lang="stylus" scoped>

</style>
