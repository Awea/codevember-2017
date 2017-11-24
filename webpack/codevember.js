const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePath = './src/js/'

// Create an object using list of files in ./src/js 
// => {'01': './src/js/01.js'}
module.exports.entries = (jsFiles) => {
  return jsFiles.reduce((entries, file) => {
    let basename      = path.basename(file, '.js')
    entries[basename] = path.resolve(basePath, file)

    return entries
  }, {})
}

// Create an array of HtmlWebpackPlugin to generate
// one html file per js
module.exports.plugins = (jsFiles) => {
  return jsFiles.map((file) => {
    let basename = path.basename(file, '.js')

    return new HtmlWebpackPlugin({
      template: './src/index.html', 
      chunks: [basename],
      title: `Codevember - 2017/11/${basename}`,
      filename: `${basename}.html`
    })
  })
}