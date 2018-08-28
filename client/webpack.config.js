const merge = require('webpack-merge');
const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');
const plugins = require('./webpack-plugins');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      loaders.extractCss
    ],
  },
	resolve: {
    alias: {
      components: PATHS.components,
    },
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    //new CleanWebpackPlugin('public', {} ),
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
        mode:'production',
        plugins: [
          plugins.loaderOptions,
          plugins.environmentVariables,
          plugins.manifest,
          plugins.sw,
          plugins.copy,
          //plugins.uglifyJs,
          plugins.Gzip,
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
          }),
        ],
      }
	  );
		break;
	case 'development':
		config = merge(
			common,
			{ devtool: 'eval-source-map', mode:'development' },
			loaders.devServer({
				host: process.env.host,
				port: process.env.port,
			})
		);
    break;
}

module.exports = config;
