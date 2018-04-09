<template>
  <div>
    <p>count: {{rCount}}</p>
    <p>aText: {{aText}}</p>
    <p>a的_text: {{a_text}}</p>
    <p>bText: {{bText}}</p>
    <p>b的_text: {{b_text}}</p>
  </div>
</template>
<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapState({
      rCount: 'count',
      aText: state => state.a.text,
      bText: state => state.b.text
    }),
    ...mapGetters({
      a_text: '_text',
      b_text: 'b/_text'
    })
  },
  methods: {
    ...mapMutations(['updateText', 'b/updateText']),
    ...mapActions(['updateTextAsync', 'b/updateTextAsync', 'b/updateCountAsync'])
  },
  mounted () {
    console.log(this.$store.state.a.aText)
    this.updateText('mutations - a')
    this.updateTextAsync({
      text: 'actions - a',
      time: 2000
    })
    this['b/updateText']('mutations - b')
    this['b/updateTextAsync']({
      text: 'actions - b',
      time: 2000
    })
    this['b/updateCountAsync']()
  }
}
</script>
