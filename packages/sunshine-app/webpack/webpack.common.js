const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const PUBLIC_PATH = path.resolve(__dirname, '..', 'public');
const MODE = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/index.tsx',
  mode: MODE,
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    globalObject: 'this',
  },
  devtool: !!process.env.DEVTOOLS,

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC_PATH, 'index.html'),
      hash: false,
      minify: true,
      manifest: path.resolve(PUBLIC_PATH, 'manifest.json'),
      favicon: path.resolve(PUBLIC_PATH, 'favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: MODE === 'development',
      useTypescriptIncrementalApi: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: {
          loader: 'worker-loader',
        },
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /(public|node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { browsers: ['> 0.25%, not dead'] },
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
    },
  },
};
