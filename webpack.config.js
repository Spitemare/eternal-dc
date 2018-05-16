const path = require('path');

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
        }
      ]
  },
  resolve: {
    extensions: [ '.js', '.json' ]
  },
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
