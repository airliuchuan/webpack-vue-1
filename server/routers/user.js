const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter
  .post('/login', async (ctx) => {
    const {username, password} = ctx.request.body
    if (username === 'kay' && password === '123') {
      ctx.session.user = {
        username: 'kay'
      }
      ctx.body = {
        succ: true,
        data: {
          username: 'kay'
        }
      }
    } else {
      ctx.status = 400
      ctx.body = {
        succ: false,
        message: '用户名或密码不正确'
      }
    }
  })


module.exports = userRouter


