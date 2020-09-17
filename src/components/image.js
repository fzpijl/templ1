const path = require('path')
const { app } = require('XRWeb')

const imageSrc = require('../images/dog.png')

const image = app.createElement('Image', {
    scale: [2, 3, 5],
    src: path.resolve(__dirname, imageSrc)
})

module.exports = image