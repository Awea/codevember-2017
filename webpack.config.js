const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['01'],
      title: 'Codevember - 2017/11/01',
      filename: '01.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['02'],
      title: 'Codevember - 2017/11/02',
      filename: '02.html'
    })
  ]
};
