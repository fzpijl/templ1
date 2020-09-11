const { app } = require('XRWeb')
const path = require('path')

let src = require('../images/dog.png')


const image = app.createElement('Image', {
    depth: 4,
    postion: [15, 10, 0],
    src: path.resolve(__dirname, src),
    scale: [3, 3, 3]
})


module.exports = image