<template>
  <div>
    <p>count: {{myCount1}}</p>
    <p>name: {{myName}}</p>
    <button @click="myUC(1)">mutation</button><br>
    <button @click="updateCountAsync(10)">action</button>
  </div>
</template>
<script>
import {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  computed: {
    // ...mapState(['count']),
    ...mapState({
      myCount: 'count',
      myCount1: state => state.count
    }),
    // ...mapGetters(['fullName'])
    ...mapGetters({
      myName: 'fullName'
    })
  },
  methods: {
    // ...mapMutations(['updateCount']),
    ...mapMutations({
      myUC: 'updateCount'
    }),
    ...mapActions(['updateCountAsync'])
  }
}
</script>
