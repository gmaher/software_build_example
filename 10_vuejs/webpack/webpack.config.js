var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "./bin"),
    publicPath: '/bin/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: '/\.vue$/',
        loader: 'vue-loader'
      },
      {
        test: '/\.js$/',
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
}
