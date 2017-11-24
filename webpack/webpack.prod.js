const merge  = require('webpack-merge')
const path   = require('path');
const fs     = require('fs');

const common     = require('./webpack.common')
const codevember = require('./codevember')
const basePath   = './src/js/'

// Js files in src/js dir
const jsFiles = fs.readdirSync(basePath).filter((entry) => !entry.includes('three_modifiers'))

var codevemberEntries = codevember.entries(jsFiles)
var codevemberPlugins = codevember.plugins(jsFiles)

module.exports = merge(common, {
  entry: codevemberEntries,
  plugins: codevemberPlugins
})