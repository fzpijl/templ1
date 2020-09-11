const fs = require('fs')
const path = require('path')

console.log('aa    mocked    __dirname..........', __dirname)
console.log('aa      path.resole.............', path.resolve())

let src = require('../models/via/via.obj')
console.log(src)

let res = fs.readFileSync(path.resolve(__dirname, src))

console.log('image data :', res)

module.exports = {
    a: 'i am from a.js'
}