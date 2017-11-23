const path              = require('path');
const fs                = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePath = './src/js/'
const jsFiles  = fs.readdirSync(basePath).filter((entry) => !entry.includes('three_modifiers'))

// Create an object using list of files in ./src/js 
// => {'01': './src/js/01.js'}
var codevemberEntries = jsFiles.reduce((entries, file) => {
  let basename      = path.basename(file, '.js')
  entries[basename] = path.resolve(basePath, file)

  return entries
}, {})

// Create an array of HtmlWebpackPlugin to generate
// one html file per js
var codevemberPlugins = jsFiles.map((file) => {
  let basename = path.basename(file, '.js')

  return new HtmlWebpackPlugin({
    template: './src/index.html', 
    chunks: [basename],
    title: `Codevember - 2017/11/${basename}`,
    filename: `${basename}.html`
  })
})

module.exports = {
  entry: codevemberEntries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {test: /\.(png|svg|jpg|gif|mp3|woff|json)$/, loader: 'file-loader'},
      {
        test: /\.(frag|vert)$/, 
        loader: 'shader-loader', 
        options: {
          glsl: {
            chunkPath: path.resolve("src/shaders/chunks")
          }
        }
      }
    ]
  },
  plugins: codevemberPlugins
};
