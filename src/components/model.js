const { app } = require('XRWeb')
const path = require('path')

const modelSrc = require('../models/earth/earch2.obj')

require('../models/weixin/weixin.obj')

const model = app.createElement('Model', {
    scale: [3, 3, 3],
    src: path.resolve(__dirname, modelSrc)
})

module.exports = model