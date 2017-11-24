const path = require('path');

module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
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
  }
};
