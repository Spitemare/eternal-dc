const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  devtool: process.env.WEBPACK_SERVE ? 'inline-source-map' : false,
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /node_modules[\\|/](comparators)/,
          loader: 'umd-compat-loader'
        }
      ]
  },
  resolve: {
    extensions: [ '.js', '.json' ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      d3: 'd3'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
