const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin') // 有了这个插件, 打包输出的会是json文件
const baseConfig = require('./webpack.config.base')
const cdnConfig = require('../app.config').cdn

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new ExtractTextPlugin('style.[contenthash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENv': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"' // ssr官方规定
  })
]

if (isDev) {
  defaultPlugins.push(new VueServerPlugin()) // 可以指定filename
}

let config

config = merge(baseConfig, {
  target: 'node', // 定义打包出来的js的执行环境
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build'),
    publicPath: cdnConfig.host
  },
  externals: Object.keys(require('../package.json').dependencies),
  devtool: 'source-map', //ssr用source-map
  module: {
    rules: [{
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }]
  },
  plugins: defaultPlugins
})

config.resolve= {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model')
  }
}

module.exports = config
