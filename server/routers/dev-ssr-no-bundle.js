const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
// 在内存里操作文件, 提高效率, 只用在开发环境
const MemoryFs = require('memory-fs')
// 直接在nodejs里打包代码
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
// const NativeModule = require('module')
// const vm = require('vm')
// 引入server-render.js
const serverRender = require('./server-render-no-bundle')

// 引入webpack配置文件
const serverConfig = require('../../build/webpack.config.server')
// 在node环境下执行打包命令, 这个serverCompiler可以调用run()和watch()方法
const serverCompiler = webpack(serverConfig)
// 实例化一个mfs
// const mfs = new MemoryFs()
// 指定webpack打包的输出目录在内存里
// serverCompiler.outputFileSystem = mfs

let bundle // 用来记录webpack每次打包出来的文件

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'server-entry.js' // vue-server-renderer默认生成的json名
  )
  delete require.cache[bundlePath]
  // 不用memory-fs, 直接吧文件打包到硬盘上
  // require会缓存, 第二次大伯就会失效, 用缓存的, 无法实时更新了, 所以require之前要先删掉缓存require.cache()
  bundle = require('../../server-build/server-entry.js').default
  // try {
  //   const m = {exports: {}}
  //   const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
  //   const wrapper = NativeModule.wrap(bundleStr)
  //   const script = new vm.Script(wrapper, {
  //     filename: 'server-entry.js',
  //     displayErrors: true
  //   })
  //   const result = script.runInThisContext()
  //   result.call(m.exports, m.exports, require, m)
  //   bundle = m.exports.default
  // } catch(err) {
  //   console.log('compiler err',err)
  // }

  console.log('new bundle completed')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = "稍定一会"
    return
  }

  const clientManifestRes = await axios.get(
    'http://127.0.0.1:8001/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestRes.data

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  const renderer = VueServerRenderer.createRenderer({
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
