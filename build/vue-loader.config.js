module.exports = (isDev) => {
  return {
    preserveWhitespace: false,
    extractCSS: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]--[local]--[hash:base64:5]' : '[name]-[hash:base64:5]',
      camelCase: true
    } 
  }
}