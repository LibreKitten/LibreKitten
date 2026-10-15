const defaultsDeep = require('lodash.defaultsdeep');
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const lightningcss = require('lightningcss');

// CSS
const autoprefixer = require('autoprefixer');
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const browserslist = require('browserslist');

// SWC
const {SwcMinifyWebpackPlugin} = require('swc-minify-webpack-plugin');

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'swc-loader',
            include: path.resolve(__dirname, 'src'),
            options: {
                jsc: {
                    target: 'es2020'
                }
            }
        },
        {
            test: /\.jsx$/,
            loader: 'swc-loader',
            include: path.resolve(__dirname, 'src'),
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
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                    importLoaders: 1,
                    localsConvention: 'camelCase'
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: function () {
                        return [
                            postcssImport,
                            postcssVars,
                            autoprefixer()
                        ];
                    }
                }
            }]
        },
        {
            test: /\.png$/i,
            loader: 'url-loader'
        },
        {
            test: /\.svg$/,
            loader: 'svg-url-loader',
            options: {
                noquote: true
            }
        }]
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
        ]
    },
    plugins: []
};

module.exports = [
    // For the playground
    defaultsDeep({}, base, {
        devServer: {
            host: '0.0.0.0',
            port: process.env.PORT || 8078
        },
        entry: {
            playground: './src/playground/playground.jsx'
        },
        output: {
            path: path.resolve(__dirname, 'playground'),
            filename: '[name].js'
        },
        plugins: base.plugins.concat([
            new HtmlWebpackPlugin({
                template: 'src/playground/index.ejs',
                title: 'Scratch 3.0 Paint Editor Playground'
            })
        ])
    }),
    // For use as a library
    defaultsDeep({}, base, {
        externals: {
            'prop-types': 'prop-types',
            'radix-ui': 'radix-ui',
            'react': 'react',
            'react-dom': 'react-dom',
            'react-intl': 'react-intl',
            'react-intl-redux': 'react-intl-redux',
            'react-popover': 'react-popover',
            'react-redux': 'react-redux',
            'react-responsive': 'react-responsive',
            'react-style-proptype': 'react-style-proptype',
            'react-tooltip': 'react-tooltip',
            'redux': 'redux'
        },
        entry: {
            'scratch-paint': './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            libraryTarget: 'commonjs2'
        }
    })
];
