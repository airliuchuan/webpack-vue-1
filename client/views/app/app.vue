<template>
  <div class="editor-con">
    <div class="title-input">
      <input type="text" placeholder="请输入标题">
    </div>
    <div class="article-input">
      <textarea class="" placeholder="请输入文章内容"></textarea>
    </div>
    <div class="submit-btn">
      <button>提交</button>
    </div>
    <div v-for="article in articles" :key="article.id">
      <h3>{{article.title}}</h3>
      <div>
        <p>{{article.content}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  metaInfo: {
    title: 'content page'
  },
  computed: {
    ...mapState(['articles'])
  },
  mounted () {
    if (this.articles && !this.articles.length) {
      this.fetchAll()
    }
  },
  asyncData ({router, store}) {
    // 在这里要不router的redirect传到服务器端
    if (store.state.user) {
      console.log('asyncData')
      return store.dispatch('fetchAll') // return不能用
    }
    router.replace('/login')
    return Promise.resolve() // 这一步别忘了
  },
  methods: {
    ...mapActions(['fetchAll'])
  }
}
</script>
<style lang="stylus" scoped>
.editor-con
  width: 800px
  margin: 0 auto
  border: 1px solid #f2f2f2
  .article-input
    width: 100%
    height: 200px
    margin-top: 30px
    textarea
      width: 100%
      height: 100%
      resize: none
      border: none
      outline: none
      border: none
      border-radius: 10px
      padding: 10px
      font-size: 14px
  .title-input
    width: 100%
    height: 50px
    border:1px solid #cccccc
    border-radius: 10px
    overflow hidden
    input
      width: 100%
      height: 100%
      outline: none
      border: none
      padding-left: 15px
      font-size: 15px
</style>
