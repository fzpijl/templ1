const fs = require('fs-extra');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// Check if ESLint is setup
let eslintExts = ['js', 'json', 'yml']
const useESLint = eslintExts.some(ext => fs.existsSync(path.resolve(__dirname, '..', `.eslintrc.${ext}`)))

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'index.js'
  },
  externals: {
    XRWeb: 'commonjs XRWeb'
  },
  target: 'node',
  node: false,
  module: {
    rules: [
      useESLint ? {
        test: /\.(js|mjs)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              eslintPath: require.resolve('eslint'),
            }
          },
        ],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      } : undefined,
      {
        test: /\.(js|mjs)$/i,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          // See #6846 for context on why cacheCompression is disabled
          cacheCompression: false
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name].[ext]'
            }
          }
        ],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      },
      {
        test: /\.(fbx|obj|mtl)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: (resourcePath, resourceQuery) => {
                let prefix = 'models'
                let resourceDir = path.dirname(resourcePath)
                let dirname = resourceDir.split(path.sep).pop() || ''
                let basename = path.basename(resourcePath)
                let resourceDest = path.join(config.output.path, prefix, dirname)
                fs.copySync(resourceDir, resourceDest, {
                  overwrite: true,
                  errorOnExist: true,
                  filter: (a) => {
                    return path.basename(a) !== basename
                  }
                })
                return `${prefix}/${dirname}/[name].[ext]`
              }
            }
          }
        ]
      }

    ].filter(Boolean),
  },
  plugins: [
   
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public')
        },
        {
          from: path.resolve(__dirname, '../XRManifest.xml')
        }
      ]
    }),
    //会清空之前复制到输出目录中的.mtl文件
    // new CleanWebpackPlugin({
    //   verbose: true
    // }),
    new FriendlyErrorsPlugin()
  ],
  stats: 'errors-only'
}


module.exports = config
