const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssName = 'bundle.css';
const jsName = 'bundle.js';

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    './index.js'
  ],
  output: {
    path: resolve(__dirname, 'app'),
    filename: jsName,
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules', resolve(__dirname, 'src')],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallback: "style-loader", use: 'css-loader'})
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'app'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({filename: cssName})
  ]
};