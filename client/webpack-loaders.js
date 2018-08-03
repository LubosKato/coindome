"use strict";

const PATHS = require('./webpack-paths');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.css = {
    test: /\.(css|scss|sass)$/,
    loader: "css-loader!sass-loader?sourceMap",
    include:PATHS.cssExclude,
    exclude:PATHS.cssIncude
}

exports.extractCss = {
  test: /\.(css|scss|sass)$/,
  loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]',
  include: PATHS.cssIncude,
  exclude: PATHS.cssExclude
};

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
