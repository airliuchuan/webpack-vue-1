const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render-no-bundle')

const clientManifest = require('../../public/vue-ssr-client-manifest.json')

const bundle = require('../../server-build/server-entry').default

const renderer = VueServerRenderer.createRenderer(
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

const router = new Router()

router.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template, bundle)
})

module.exports = router


