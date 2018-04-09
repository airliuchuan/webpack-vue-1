<template>
  <div>
    <h1>我是header{{text}}</h1>
  </div>
</template>
<script>

export default {
  data () {
    return {
      text: 'renText'
    }
  },
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.header
  color: #f00
</style>
