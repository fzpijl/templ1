const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

//resolve symlinks
const appDir = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDir, relativePath)

const moduleExtensions = ['mjs', 'js', 'ts']
const resolveModule = (resolveFn, filePath) => {
    let extension = moduleExtensions.find(extension => 
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    )
    if (extension) return resolveFn(`${filePath}.${extension}`)

    return undefined
}

function checkRequiredPath(paths) {
    let currentFile
    try {
        paths.forEach(path => {
            currentFile = path
            fs.accessSync(path, fs.F_OK)
        })
        return true
    } catch (err) {
        var dirName = path.dirname(currentFile);
        var fileName = path.basename(currentFile);
        console.log(chalk.red('Could not find a required file.'));
        console.log(chalk.red('  Name: ') + chalk.cyan(fileName));
        console.log(chalk.red('  Searched in: ') + chalk.cyan(dirName));
        return false;
    }
}

//index.xml可以在根目录或是public目录；index.js可以在根目录或是src目录
module.exports = {
    appPath: resolveApp('.'),
    appXml: ['index.xml', 'public/index.xml'].reduce((acc, cur) => {
        if (fs.existsSync(resolveApp(cur))) {
            acc = resolveApp(cur)
        }
        return acc
    }, resolveApp('index.xml')),
    appIndex: resolveModule(resolveApp, 'index') || resolveModule(resolveApp, 'src/index') || resolveApp('index.js'),
    appSrc: resolveApp('src'),
    appDist: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appPackageJson: resolveApp('package.json'),
    checkRequiredPath
}
