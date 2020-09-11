const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { dirname } = require('path')

// Get all file entries  
function getEntries() {  
    let map = {}  
    const entryFiles = glob.sync("./src/**/*.js")  
    console.log(entryFiles)
    
    entryFiles.forEach(filepath => {  
      let fileDir = /\.\/src\/(.*?)\.js/.exec(filepath)  
    
        map[fileDir[1]] = {
            name: fileDir[1],
            minChunks: 1
      }
    })  
    console.log(map)
    
    return map  
  }

const config = {
    mode: 'development',
    entry: {index: './src/index.js'},
    devtool:false, 
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: '[name].js',
        publicPath: ''
    },
    externals: {
        XRWeb: 'commonjs XRWeb'
    },
    target: 'node', 
    node: {
        __dirname: false
    },
    optimization: {
        minimize: false,
        // splitChunks: {
        //     chunks: 'all',
        //     cacheGroups: getEntries()
        // }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(obj|mtl|fbx)$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 esModule: false,
            //                 // name: (resourcePath, resourceQuery) => {
            //                 //     let prefix = 'models'
            //                 //     let resourceDir = path.dirname(resourcePath)
            //                 //     let dirname = resourceDir.split(path.sep).pop() || ''
            //                 //     let basename = path.basename(resourcePath)
            //                 //     let resourceDest = path.join(config.output.path, prefix, dirname)
            //                 //     fs.copySync(resourceDir, resourceDest, {
            //                 //         overwrite: true,
            //                 //         errorOnExist: true,
            //                 //         filter: (a) => {
            //                 //             return path.basename(a) !== basename
            //                 //         }
            //                 //     })
            //                 //     return `${prefix}/${dirname}/[name].[ext]`
            //                 // }
            //                 name: '[name].[ext]'
            //             }
            //         }
            //     ]
            // }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/**/*',
                    to: './',
                    globOptions: {
                        ignore: ['**/*.js']
                    }
                }
            ],
            
        })
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: './index.xml', to: path.resolve(__dirname, 'dist')
        //         },
        //         { 
        //             from: './XRManifest.xml', to:  path.resolve(__dirname, 'dist')
        //         },
        //         {
        //             from: './images/*', to:  path.resolve(__dirname, 'dist')
        //         }
        //     ]
        // })
    ],
    // performance: {
    //     hints: 'error',
    //     // maxAssetSize: 10000
    //     maxEntrypointSize: 1400
    // }
}

module.exports = config