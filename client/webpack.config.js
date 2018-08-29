const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');
const plugins = require('./webpack-plugins');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = {
  entry: PATHS.src,
  output: {
    path: PATHS.public,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      loaders.babel,
      loaders.css,
      loaders.extractCss,
    ],
  },
  resolve: {
    alias: {
      components: PATHS.components,
    },
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    // new CleanWebpackPlugin('public', {} ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
    }),
    plugins.extractText,
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // })
  ],
};

let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = merge(
      common,
      {
        devtool: 'source-map',
        mode: 'production',
        optimization: {
          minimize: true,
          runtimeChunk: true,
          noEmitOnErrors: true,
          splitChunks: {
            chunks: 'async',
            minSize: 1000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
              default: {
                minChunks: 1,
                priority: -20,
                reuseExistingChunk: true,
              },
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
              },
            },
          },
        },
        plugins: [
          plugins.loaderOptions,
          plugins.environmentVariables,
          plugins.manifest,
          plugins.sw,
          plugins.copy,
          // plugins.uglifyJs,
          // plugins.Gzip,
          new webpack.DefinePlugin({
            'process.env': {
              API_HOST: JSON.stringify('https://coindome.herokuapp.com'),
              SUBS_HOST: JSON.stringify('wss://coindome.herokuapp.com'),
            },
          }),
        ],
      },
    );
    break;
  case 'development':
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
        mode: 'development',
        plugins: [
          new webpack.DefinePlugin({
            'process.env': {
              API_HOST: JSON.stringify('http://localhost:3000'),
              SUBS_HOST: JSON.stringify('ws://localhost:3000'),
            },
          }),
        ],
      },
      loaders.devServer({
        host: process.env.host,
        port: process.env.port,
      }),
    );
    break;
  default:
    break;
}

module.exports = config;
