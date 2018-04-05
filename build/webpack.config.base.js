const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const createVueLoaderOptions = require('./vue-loader.config')

const config = {
  resolve: {
    alias: {
      '@assets':path.join(__dirname, '../client/assets')
    }
  },
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/, 
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resources/[path][name].[hash].[ext]' // 优化静态资源目录[path]是: /这样的路径/
            }
          }
        ]
      }
    ]
  }
}

module.exports = config