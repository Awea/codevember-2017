const path = require('path');

module.exports = {
  entry: {
    '01': './src/js/01.js',
    '02': './src/js/02.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader'}
    ]
  }
};
