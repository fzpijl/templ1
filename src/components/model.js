const { app } = require('XRWeb')
const path = require('path')

const src = require('../models/facebook/facebook.obj')

const model = app.createElement('Model', {
    src: path.resolve(__dirname, src),
    position: [-4, 3, -4],
    scale: [4, 4, 5],
    // glowSize: 4,
    // glowColor : [0, 1, 0],
    // glowType: 'inner' 
})

module.exports = model