const webpack = require('webpack')
const config = require('../webpack.config')
const fs = require('fs')
const FormData = require('form-data')
const fecth = require('node-fetch')
const path = require('path')

const JSZip = require('jszip')
const zip = new JSZip()

function makeZip(p, folder) {
    let dirs = fs.readdirSync(p)
    for (let i = 0, l = dirs.length; i < l; i++) {
        let filePath = path.resolve(p, dirs[i])
        let stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
            let newFolder = folder.folder(dirs[i])
            makeZip(filePath, newFolder)
        } else if (stats.isFile()) {
            let fileContent = fs.readFileSync(filePath)
            folder.file(dirs[i], fileContent)
        }
    }
}


function send(zipFile) {
    fs.readFile(zipFile, (err, buffer) => {
        const fdata = new FormData()
        fdata.append('file', buffer, { filename: 'out.zip' })
        fecth('http://192.168.1.70:8081/app/upload', {
            method: 'POST',
            body: fdata
        }).then(res => {
            console.log('fetch success......')
        }).catch(err => {
            console.log('fetch err..............')
        })
    })
}

config.mode = 'production'

webpack(config, (err, stats) => {
    if (err) throw err

    let distPath = path.resolve(__dirname, '..', 'dist')
    makeZip(distPath, zip)

    zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).
        pipe(fs.createWriteStream('out.zip')).
        on('finish', function (e) {
            console.log('make zip file')
            send('out.zip')
        })

})

