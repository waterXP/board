const webpack = require('webpack')
const path = require('path')
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

module.exports = {
  entry: [
    './src/App.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }    
  },
  module: {
    loaders: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }, {
      exclude: /(node_modules|bower_components)/,
      test: /\.(js|jsx)?$/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-decorators-legacy'],
        presets: ['es2015', 'react', 'stage-0']
      }
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 20001,
    proxy: {
      '/api': {
        target: 'http://localhost:13334/board',
        pathRewrite: {'^/api' : ''},
        secure: false
      }
    },
    historyApiFallback: {
      index: '/index.html'
    }
  }
}
