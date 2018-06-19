const path = require('path');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.jsx'),
  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },
  devtool: 'source-map',
  module: {
    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),    
      loader: 'babel-loader',
      query: {
        presets: ["react", "es2015", ]
      },
    },
    { 
      test: /\.(scss|css|less)$/,
      loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]___[hash:base64:5]'
    },

  ]},
  
  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};