export default {
  data () {
    return {
      test: '这是用jsx语法写的vue模板'
    }
  },
  render () {
    return (
      <div>
        {this.test}
      </div>
    )
  }
}
