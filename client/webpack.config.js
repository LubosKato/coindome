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
      //loaders.css,
      //loaders.extractCss,
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              sourceMap: true,
              importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    plugins.sw,
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
        resolve: {
          alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
            // Not necessary unless you consume a module using `createClass`
            'create-react-class': 'preact-compat/lib/create-react-class',
          },
        },
        plugins: [
          plugins.loaderOptions,
          plugins.environmentVariables,
          plugins.manifest,
          plugins.copy,

          // plugins.uglifyJs,
          plugins.brotliGzip,
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
