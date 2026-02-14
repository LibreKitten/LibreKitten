const defaultsDeep = require('lodash.defaultsdeep');
const path = require('path');
const webpack = require('webpack');

// lk: Get the monorepo's package.json.
const monorepoPackageJson = require('../../package.json');

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCss
const autoprefixer = require('autoprefixer');
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');

// CSS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lightningcss = require('lightningcss');
const browserslist = require('browserslist');

// SWC
const {SwcMinifyWebpackPlugin} = require('swc-minify-webpack-plugin');

const STATIC_PATH = process.env.STATIC_PATH || '/static';
const {APP_NAME, DESCRIPTION} = require('./src/lib/brand');

const root = process.env.ROOT || '';
if (root.length > 0 && !root.endsWith('/')) {
    throw new Error('If ROOT is defined, it must have a trailing slash.');
}

const htmlWebpackPluginCommon = {
    root: root,
    meta: JSON.parse(process.env.EXTRA_META || '{}'),
    APP_NAME,
    trackerId: String(process.env.TRACKER_ID ?? '')
};

// When this changes, the path for all JS files will change, bypassing any HTTP caches
const CACHE_EPOCH = 'pentapod';

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.SOURCEMAP || (process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map'),
    snapshot: {
        unmanagedPaths: [
            /^(.+?[\\/]node_modules[\\/]scratch-[^\\/]+)[\\/]/
        ]
    },
    devServer: {
        /* static: {
            directory: path.resolve(__dirname, 'build'),
        }, */
        host: '0.0.0.0',
        // disableHostCheck: true,
        compress: true,
        port: process.env.PORT || 8601,
        // allows ROUTING_STYLE=wildcard to work properly
        historyApiFallback: {
            rewrites: [
                {from: /^\/\d+\/\/?$/, to: '/'},
                {from: /^\/\d+\/for-contributors\/?$/, to: '/for-contributors.html'},
                {from: /^\/\d+\/server-manual\/?$/, to: '/server-manual.html'},
                {from: /^\/\d+\/projects\/?$/, to: '/projects.html'},
                {from: /^\/\d+\/fullscreen\/?$/, to: '/fullscreen.html'},
                {from: /^\/\d+\/editor\/?$/, to: '/editor.html'},
                {from: /^\/\d+\/embed\/?$/, to: '/embed.html'},
                {from: /^\/addons\/?$/, to: '/addons.html'}
            ]
        },
        hot: false
    },
    watchOptions: {
        followSymlinks: true
    },
    output: {
        library: 'GUI',
        filename: (
            process.env.NODE_ENV === 'production' ? `js/${CACHE_EPOCH}/[name].[contenthash].js` : 'js/[name].js'
        ),
        chunkFilename: (
            process.env.NODE_ENV === 'production' ? `js/${CACHE_EPOCH}/[name].[contenthash].js` : 'js/[name].js'
        ),
        publicPath: root
    },
    resolve: {
        fullySpecified: false,
        extensions: ['.ts', '.js'],
        alias: {
            'text-encoding$': path.resolve(__dirname, 'src/lib/tw-text-encoder'),
            'scratch-render-fonts$': path.resolve(__dirname, 'src/lib/tw-scratch-render-fonts'),
            // lk: Hack to get Radix working on the ancient version of React we're using.
            // Based on https://github.com/xyflow/xyflow/issues/4683#issuecomment-2388049017
            'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
            'react/jsx-runtime': 'react/jsx-runtime.js'
        },
        fallback: {
            buffer: require.resolve('buffer'),
            events: require.resolve('events/')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'swc-loader',
            include: [
                path.resolve(__dirname, 'src'),
                /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                /node_modules[\\/]pify/,
                /node_modules[\\/]@vernier[\\/]godirect/
            ],
            options: {
                jsc: {
                    target: 'es2020'
                }
            }
        },
        {
            test: /\.jsx$/,
            loader: 'swc-loader',
            include: [
                path.resolve(__dirname, 'src'),
                /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                /node_modules[\\/]pify/,
                /node_modules[\\/]@vernier[\\/]godirect/
            ],
            options: {
                jsc: {
                    parser: {
                        jsx: true
                    },
                    target: 'es2020'
                }
            }
        },
        {
            test: /\.ts$/,
            loader: 'swc-loader',
            include: [
                path.resolve(__dirname, 'src'),
                /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                /node_modules[\\/]pify/,
                /node_modules[\\/]@vernier[\\/]godirect/
            ],
            options: {
                jsc: {
                    parser: {
                        syntax: 'typescript'
                    },
                    target: 'es2020'
                }
            }
        },
        {
            test: /\.tsx$/,
            loader: 'swc-loader',
            include: [
                path.resolve(__dirname, 'src'),
                /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                /node_modules[\\/]pify/,
                /node_modules[\\/]@vernier[\\/]godirect/
            ],
            options: {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true
                    },
                    target: 'es2020'
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]_[local]_[hash:base64:5]',
                        camelCase: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: function () {
                            return [
                                postcssImport,
                                postcssVars,
                                autoprefixer
                            ];
                        }
                    }
                }]
        }]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/scratch-blocks/media',
                    to: 'static/blocks-media/default'
                },
                {
                    from: 'node_modules/scratch-blocks/media',
                    to: 'static/blocks-media/high-contrast'
                },
                {
                    from: 'src/lib/themes/blocks/high-contrast-media/blocks-media',
                    to: 'static/blocks-media/high-contrast',
                    force: true
                }
            ]
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        }),
        new MiniCssExtractPlugin()
    ]
};

if (!process.env.CI) {
    base.plugins.push(new webpack.ProgressPlugin());
}

module.exports = [
    // to run editor examples
    defaultsDeep({}, base, {
        entry: {
            'editor': './src/playground/editor.jsx',
            'player': './src/playground/player.jsx',
            'fullscreen': './src/playground/fullscreen.jsx',
            'embed': './src/playground/embed.jsx',
            'addon-settings': './src/playground/addon-settings.jsx',
            'for-contributors': './src/playground/for-contributors/for-contributors.jsx',
            'server-manual': './src/playground/server-manual/server-manual.jsx',
            'credits': './src/playground/credits/credits.jsx',
            'not_found': './src/playground/not_found/not_found.jsx',
            'index': './src/playground/index/index.jsx'
        },
        output: {
            path: path.resolve(__dirname, 'build')
        },
        module: {
            rules: base.module.rules.concat([
                {
                    test: /\.(svg|png|wav|mp3|gif|jpg|woff2|hex)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        outputPath: 'static/assets/',
                        esModule: false
                    }
                }
            ])
        },
        optimization: {
            minimizer: [
                new SwcMinifyWebpackPlugin({
                    compress: true,
                    mangle: true
                }),
                new CssMinimizerPlugin({
                    minify: CssMinimizerPlugin.lightningCssMinify,
                    minimizerOptions: {
                        minify: true,
                        targets: lightningcss.browserslistToTargets(browserslist())
                    }
                })
            ],
            splitChunks: {
                minChunks: 2,
                minSize: 50000,
                maxInitialRequests: 5
            }
        },
        plugins: base.plugins.concat([
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
                'process.env.DEBUG': Boolean(process.env.DEBUG),
                'process.env.ENABLE_SERVICE_WORKER': JSON.stringify(process.env.ENABLE_SERVICE_WORKER || ''),
                'process.env.ROOT': JSON.stringify(root),
                'process.env.ROUTING_STYLE': JSON.stringify(process.env.ROUTING_STYLE || 'filehash'),
                'process.env.npm_package_version': JSON.stringify(monorepoPackageJson.version),
                'process.env.CANARY_MODE': Boolean(process.env.CANARY_MODE),
                'process.env.ENABLE_WINDCHIMES': JSON.stringify(process.env.ENABLE_WINDCHIMES || '')
            }),
            new HtmlWebpackPlugin({
                chunks: ['editor'],
                template: 'src/playground/player.ejs',
                filename: 'editor.html',
                title: `Editor - ${APP_NAME}`,
                description: DESCRIPTION,
                isEditor: true,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['player'],
                template: 'src/playground/player.ejs',
                filename: 'projects.html',
                title: `Player - ${APP_NAME}`,
                description: DESCRIPTION,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['fullscreen'],
                template: 'src/playground/player.ejs',
                filename: 'fullscreen.html',
                title: `Editor - ${APP_NAME}`,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['embed'],
                template: 'src/playground/embed.ejs',
                filename: 'embed.html',
                title: `Embedded Project - ${APP_NAME}`,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['addon-settings'],
                template: 'src/playground/simple.ejs',
                filename: 'addons.html',
                title: `Addon Settings - ${APP_NAME}`,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['for-contributors'],
                template: 'src/playground/simple.ejs',
                filename: 'for-contributors.html',
                title: `Contributing to ${APP_NAME} - ${APP_NAME}`,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['server-manual'],
                template: 'src/playground/simple.ejs',
                filename: 'server-manual.html',
                title: `How to Setup a ${APP_NAME} Web Server - ${APP_NAME}`,
                description:
                    `Ever wanted to write a website or API with ${APP_NAME}? Then you have found the right place! ` +
                    'We will show you how to do just that.',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['credits'],
                template: 'src/playground/simple.ejs',
                filename: 'credits.html',
                title: `${APP_NAME} Credits`,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['not_found'],
                template: 'src/playground/simple.ejs',
                filename: 'not_found.html',
                title: `404 - ${APP_NAME}`,
                noSplash: true,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                chunks: ['index'],
                template: 'src/playground/simple.ejs',
                filename: 'index.html',
                title: `Blocks not just for the browser; say hello to the server! - ${APP_NAME}`,
                description:
                    `${APP_NAME} is a block-based coding language in alpha, that allows you to program more than ` +
                    `just the browser; you can program the server. You can reach the clouds with ${APP_NAME}!`,
                noSplash: true,
                ...htmlWebpackPluginCommon
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'static',
                        to: ''
                    }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'extensions/**',
                        to: 'static',
                        context: 'src/examples'
                    }
                ]
            })
        ])
    })
].concat(
    process.env.NODE_ENV === 'production' || process.env.BUILD_MODE === 'dist' ? (
        // export as library
        defaultsDeep({}, base, {
            target: 'web',
            entry: {
                'scratch-gui': './src/index.js'
            },
            output: {
                libraryTarget: 'umd',
                filename: 'js/[name].js',
                chunkFilename: 'js/[name].js',
                path: path.resolve('dist'),
                publicPath: `${STATIC_PATH}/`
            },
            externals: {
                'react': 'react',
                'react-dom': 'react-dom'
            },
            module: {
                rules: base.module.rules.concat([
                    {
                        test: /\.(svg|png|wav|mp3|gif|jpg|woff2|hex)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 2048,
                            outputPath: 'static/assets/',
                            publicPath: `${STATIC_PATH}/assets/`,
                            esModule: false
                        }
                    }
                ])
            },
            plugins: base.plugins.concat([
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: 'extension-worker.{js,js.map}',
                            context: 'node_modules/scratch-vm/dist/web',
                            noErrorOnMissing: true
                        }
                    ]
                }),
                // Include library JSON files for scratch-desktop to use for downloading
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: 'src/lib/libraries/*.json',
                            to: 'libraries',
                            flatten: true
                        }
                    ]
                })
            ])
        })) : []
);
