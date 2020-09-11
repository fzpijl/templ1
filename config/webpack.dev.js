const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        pathinfo: true
    }
})