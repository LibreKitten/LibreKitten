const {DefinePlugin} = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaultsDeep = require('lodash.defaultsdeep');
const path = require('path');

const {SwcMinifyWebpackPlugin} = require('swc-minify-webpack-plugin');

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        contentBase: false,
        host: '0.0.0.0',
        port: process.env.PORT || 8073
    },
    devtool: 'cheap-module-source-map',
    output: {
        library: 'VirtualMachine',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.[tj]s$/,
            loader: 'swc-loader',
            include: path.resolve(__dirname, 'src'),
            options: {
                jsc: {
                    target: 'es2020'
                }
            }
        },
        {
            test: /\.mp3$/,
            loader: 'file-loader',
            options: {
                outputPath: 'media/music/'
            }
        }]
    },
    optimization: {
        minimizer: [
            new SwcMinifyWebpackPlugin({
                compress: true,
                mangle: true
            })
        ]
    },
    plugins: [
        new DefinePlugin({
            importMetaURL: 'import.meta.url'
        })
    ]
};

module.exports = [
    // Web-compatible
    defaultsDeep({}, base, {
        target: 'web',
        entry: {
            'scratch-vm': './src/index.js',
            'scratch-vm.min': './src/index.js'
        },
        output: {
            libraryTarget: 'umd',
            path: path.resolve('dist', 'web')
        },
        resolve: {
            fallback: {
                buffer: require.resolve('buffer'),
                events: require.resolve('events/')
            }
        },
        module: {
            rules: base.module.rules.concat([
                {
                    test: require.resolve('./src/index.js'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: {
                                exposes: 'VirtualMachine'
                            }
                        }
                    ]
                }
            ])
        }
    }),
    // Node-compatible
    defaultsDeep({}, base, {
        target: 'node',
        entry: {
            'scratch-vm': './src/index.js'
        },
        output: {
            libraryTarget: 'commonjs2',
            path: path.resolve('dist', 'node')
        },
        externals: {
            'decode-html': true,
            'format-message': true,
            'htmlparser2': true,
            'scratch-parser': true,
            'socket.io-client': true,
            'text-encoding': true,
            'markdown-it': true
        }
    }),
    // Server
    defaultsDeep({}, base, {
        target: 'node',
        entry: {
            librekitten: './src/server/cli.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve('dist', 'server')
        },
        plugins: base.plugins.concat([
            new CopyWebpackPlugin([{
                from: 'package.json'
            }])
        ])
    }),
    // Playground
    defaultsDeep({}, base, {
        target: 'web',
        entry: {
            'benchmark': './src/playground/benchmark',
            'video-sensing-extension-debug': './src/extensions/scratch3_video_sensing/debug'
        },
        output: {
            path: path.resolve(__dirname, 'playground'),
            filename: '[name].js'
        },
        resolve: {
            fallback: {
                buffer: require.resolve('buffer'),
                events: require.resolve('events/')
            }
        },
        module: {
            rules: base.module.rules.concat([
                {
                    test: require.resolve('./src/index.js'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: {
                                exposes: 'VirtualMachine'
                            }
                        }
                    ]
                },
                {
                    test: require.resolve('./src/extensions/scratch3_video_sensing/debug.js'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: {
                                exposes: 'Scratch3VideoSensingDebug'
                            }
                        }
                    ]
                },
                {
                    test: require.resolve('stats.js/build/stats.min.js'),
                    loader: 'script-loader'
                },
                {
                    test: require.resolve('scratch-blocks/dist/vertical.js'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: {
                                exposes: 'Blockly'
                            }
                        }
                    ]
                },
                {
                    test: require.resolve('scratch-audio/src/index.js'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: {
                                exposes: 'AudioEngine'
                            }
                        }
                    ]
                },
                {
                    test: require.resolve('scratch-storage/src/index.js'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: {
                                exposes: 'ScratchStorage'
                            }
                        }
                    ]
                },
                {
                    test: require.resolve('scratch-render/src/index.js'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: {
                                exposes: 'ScratchRender'
                            }
                        }
                    ]
                }
            ])
        },
        performance: {
            hints: false
        },
        plugins: base.plugins.concat([
            new CopyWebpackPlugin([{
                from: 'node_modules/scratch-blocks/media',
                to: 'media'
            }, {
                from: 'node_modules/scratch-storage/dist/web'
            }, {
                from: 'node_modules/scratch-render/dist/web'
            }, {
                from: 'node_modules/@turbowarp/scratch-svg-renderer/dist/web'
            }, {
                from: 'src/playground'
            }])
        ])
    })
];
