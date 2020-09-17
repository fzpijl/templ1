const webpack = require('webpack')
const paths = require('./paths')
let config = require('../config/webpack.dev')
const chalk = require('chalk')

// if (!paths.checkRequiredPath([paths.appXml, paths.appIndex])) {
//     process.exit(1)
// }

function build() {

    console.log('start build...');

    const compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            let messages;
            if (err) {
                if (!err.message) {
                    return reject(err);
                }

                let errMessage = err.message;

                // Add additional information for postcss errors
                if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
                    errMessage +=
                        '\nCompileError: Begins at CSS selector ' +
                        err['postcssNode'].selector;
                }

                messages = formatWebpackMessages({
                    errors: [errMessage],
                    warnings: [],
                });
            } else {
                messages = formatWebpackMessages(
                    stats.toJson({ all: false, warnings: true, errors: true })
                );
            }


            if (messages.errors.length) {
                // Only keep the first error. Others are often indicative
                // of the same problem, but confuse the reader with noise.
                if (messages.errors.length > 1) {
                    messages.errors.length = 1;
                }
                return reject(new Error(messages.errors.join('\n\n')));
            }
            if (
                process.env.CI &&
                (typeof process.env.CI !== 'string' ||
                    process.env.CI.toLowerCase() !== 'false') &&
                messages.warnings.length
            ) {
                console.log(
                    chalk.yellow(
                        '\nTreating warnings as errors because process.env.CI = true.\n' +
                        'Most CI servers set it automatically.\n'
                    )
                );
                return reject(new Error(messages.warnings.join('\n\n')));
            }

            return resolve({
                stats,
                warnings: messages.warnings,
            });
        });
    });
}

// webpack(config, (err, stats) => {
//     console.log('...................................................................ddddddddddddd')
//     // console.log(err)
//     // console.log(stats.hasErrors())
//     // if (stats.hasErrors()) {
//     //    let s =  stats.toJson({ all: false, warnings: true, errors: true })
//     //    console.log(s)
//     // }
// })



build = function () {
    let compiler = webpack(config)
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err)
            } else {
                resolve(stats)
            }
        })
    })
}
build()



