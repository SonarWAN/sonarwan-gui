const path = require('path')
const webpack = require('webpack')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

var config = {
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
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
