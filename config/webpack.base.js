const fs = require('fs');
const path = require('path');

const paths = require('./paths');

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);
const useESLint = fs.existsSync(path.resolve(__dirname), '..', '.eslintrc.js')

module.exports = function (webpackEnv) {
  const isEnvProduction = webpackEnv === 'production';

  return {
    entry: 'index.js',
    output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: 'index.js'
    },
    resolve: {
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
    },
    module: {
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|mjs|ts)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                eslintPath: require.resolve('eslint'),
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
        }, {
          test: /\.(js|mjs|ts)$/,
          exculde: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // See #6846 for context on why cacheCompression is disabled
            cacheCompression: false
          }
        },
      ],
    },
    externals: {
      XRWeb: 'commonjs XRWeb'
    },
    target: 'node',
    node: false
  };
};
