<template>
  <div>
    <span>我是headersun</span>
    <p>爷爷给我的value: {{data.value}}</p>
    <p>render的hs: {{hs}}</p>
    <slot></slot>
    <slot sun="我是sun给你的" name="header"></slot>
  </div>
</template>
<script>
export default {
  props: {
    hs: {
      type: String,
      required: true
    }
  },
  inject: ['data'],
  mounted () {
    console.log(this.data.value)
  }
}
</script>
<style lang="stylus" scoped>

</style>
