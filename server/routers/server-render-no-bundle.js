const ejs = require('ejs')

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html'

  // 这个context是传入到vue-server-renderer, vue-server-renderer渲染完成后可以自动往context上添加很多属性
  const context = {
    url: ctx.path,
    user: ctx.session.user
  }

  try {
    const app = await bundle(context)

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    // 获取html内容
    const appString = await renderer.renderToString(app, context)

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      title: title.text(),
      appString, // html内容
      style: context.renderStyles(), // css内容
      script: context.renderScripts(), // js内容
      initalState: context.renderState()
    })

    ctx.body = html

  } catch (err) {
    console.log('render err', err)
    throw err
  }
}