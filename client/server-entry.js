import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()

    // 在服务器端获取session并添加到store中
    if (context.user) {
      store.state.user = context.user
    }

    router.push(context.url)
    // 路由跳转后, 所有的异步操作都完成后执行
    router.onReady(() => {
      // 可以通过router.getMatchedComponents() 获取到匹配的组件实例
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no componet matched'))
      }
      Promise.all(matchedComponents.map(component => {
        // 通过匹配到的实例, 可以调用实例的任何属性和方法
        // 调用asyncData(), 还可以传参数
        if (component.asyncData) {
          return component.asyncData({
            route: router.currentRoute,
            router,
            store
          })
        }
      })).then(data => {
        console.log(store.state)
        context.meta = app.$meta()
        context.state = store.state
        context.router = router
        resolve(app)
      })
      // 这里的resolve(app) 要等获取玩数据在resolve()
      // context.meta = app.$meta()
      // resolve(app)
    })
  })
}
