const merge  = require('webpack-merge')
const path   = require('path');
const fs     = require('fs');

const common     = require('./webpack.common')
const codevember = require('./codevember')
const basePath   = './src/js/'

// Only the last day is used as entry
const jsFiles = fs.readdirSync(basePath).filter((entry) => !entry.includes('three_modifiers')).sort().reverse().splice(0, 1)

var codevemberEntries = codevember.entries(jsFiles)
var codevemberPlugins = codevember.plugins(jsFiles)

module.exports = merge(common, {
  entry: codevemberEntries,
  plugins: codevemberPlugins
})