const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  devtool: 'inline-source-map',
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
  },
  serve: {
    dev: {
      outputPath: path.resolve(__dirname, 'dist')
    }
  }
};
