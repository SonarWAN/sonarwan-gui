const path = require('path')
const webpack = require('webpack')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

module.exports = {
  target: 'electron-renderer',
  entry: {
    index: './app/app',
  },
  output: {
    filename: 'js/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: [
            'transform-es2015-destructuring',
            ['transform-object-rest-spread', { 'useBuiltIns': true }]
          ]
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      }
    ]
  }
}
