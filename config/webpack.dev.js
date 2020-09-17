const merge = require('webpack-merge').default
const baseConfig = require('./webpack.base')


module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        pathinfo: true
    }
})