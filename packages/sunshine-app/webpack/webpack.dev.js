const baseConfig = require('./webpack.common');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    stats: 'minimal',
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
});
