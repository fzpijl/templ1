const fs = require('fs')
const path = require('path')

// fs.accessSync('./index.xml1', fs.F_OK)

let d = path.resolve('src')

console.log(d, ',resolve',)
console.log(__dirname, ', __dirname')
console.log(process.cwd(), ', __cwd')

console.log('end....')