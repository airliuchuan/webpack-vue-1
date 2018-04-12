const Router = require('koa-router')

const apiRouter = new Router({prefix: '/api'})

const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}
apiRouter.use(validateUser)

const handleSucc = data => {
  return {
    succ: true,
    data
  }
}

apiRouter
  .post('/add', async (ctx) => {
    const content = ctx.request.body
    const data = await ctx.db.addOne(content)
    console.log(data)
    ctx.body = handleSucc(data)
  })
  .get('/one/:id', async (ctx) => {
    const id = ctx.params.id
    const data = await ctx.db.getOne(id)
    ctx.body = handleSucc(data)
  })
  .get('/all', async (ctx) => {
    const data = await ctx.db.getAll()
    ctx.body = handleSucc(data)
  })
  .put('/update/:id', async (ctx) => {
    const id = ctx.params.id
    const content = ctx.request.body
    console.log(id, content)
    const data = await ctx.db.update(id, content)
    ctx.body = handleSucc(data)
  })
  .delete('/del/:id', async (ctx) => {
    const id = ctx.params.id
    const data = await ctx.db.delOne(id)
    ctx.body = handleSucc(data)
  })
  .post('/delall', async (ctx) => {
    const ids = ctx.request.body.ids
    const data = await ctx.db.delAll(ids)
    ctx.body = handleSucc(data)
  })

module.exports = apiRouter
