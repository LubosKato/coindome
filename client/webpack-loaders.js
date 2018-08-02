"use strict";

const PATHS = require('./webpack-paths');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
  include: PATHS.css,
}

exports.extractCss = {
  test:/\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        query: {
          modules: true,
        },
      },
    ],
  }),
};
exports.extractSass= {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract(
    {
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
}

exports.babel = {
  test: /\.jsx?$/,
  use: ['babel-loader'],
  exclude: /node_modules/,
};

exports.devServer = function(options) {
	return {
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			stats: 'errors-only',
			host: options.host,
			port: options.port,
      contentBase: './client/dist',
      proxy: {
        '/graphql': {
            target: 'http://localhost:3000',
        },
        '/api': {
          target: 'http://localhost:3000',
        },
        '/auth': {
          target: 'http://localhost:3000',
        },
        '/subscriptions': {
          target: 'http://localhost:3001',
        }
      }
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin({
				multistep: true
			})
		],
	};
};
