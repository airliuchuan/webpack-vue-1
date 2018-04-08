<script>
import HeaderSun from './headerSun.vue'
export default {
  components: {
    HeaderSun
  },
  props: {
    renText: {
      type: String,
      default: '111'
    }
  },
  methods: {
    handleClick () {
      console.log('hhhhhhh')
    }
  },
  render (createElement) {
    return createElement('div', {
      attrs: {
        class: 'text'
      },
      domProps: {},
      on: {
        click: this.handleClick
      },
      nativeOn: { // nativeOn是直接把事件绑定到组件原生dom的根节点上
        ciick: this.handleClick
      }
    }, [createElement('header-sun', {
      props: {
        hs: this.renText
      }
    }, [createElement('span', {
      slot: 'header'
    },
    `headerSlot`)]), this.renText])
  }
}
</script>
<style lang="stylus" scoped>
.text
  color: red
</style>
