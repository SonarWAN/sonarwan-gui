const path = require('path')
const webpack = require('webpack')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

module.exports = {
  target: 'electron-renderer',
  entry: {
    index: './app/app',
  },
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'app.js',
    publicPath: 'js/'
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
            'transform-class-properties',
            'transform-es2015-destructuring',
            ['transform-object-rest-spread', { 'useBuiltIns': true }]
          ]
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: { limit: 10000, mimetype: 'application/font-woff' }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      }
    ]
  }
}
