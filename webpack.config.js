const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const UglifyJS = require('uglifyjs-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT
const WEBPACK_FILE_NAME_TEMPLATE = NODE_ENV === 'development' ? '[name]' : '[name].[chunkhash]'
const DIST_DIRECTORY = NODE_ENV === 'production' ? 'prod-dist' : 'dist'
const BUILDSCRIPT = process.env.BUILDSCRIPT || 'Unknown Build Script'
const NO_API = process.env.NO_API === '1'
const OFFLINE = process.env.OFFLINE === '1'
const DEBUG = process.env.DEBUG === '1'
/**
 * Plugin Definition
 */

const extractCSS = new MiniCssExtractPlugin({
    filename: WEBPACK_FILE_NAME_TEMPLATE + '.css',
    chunkFilename: '[id].css'
})

const uglifyjsPlugin = new UglifyJS({
    parallel: 4,
    sourceMap: NODE_ENV === 'development',
    uglifyOptions: {
        warnings: false
    }
})

const WEBPACK_PLUGINS = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.$": "jquery",
        "window.jQuery": "jquery",
        Popper: ['popper.js', 'default']
    }),
    extractCSS,
    new BundleAnalyzerPlugin({
        analyzerMode: BUILDSCRIPT === 'start-dev-debug' ? 'server' : 'disabled'
    }),
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'global.BUILDSCRIPT': JSON.stringify(BUILDSCRIPT),
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.js',
        favicon: './src/theme/images/icons/favicon.png'
    }),
    // new ManifestPlugin(),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
            `${DIST_DIRECTORY}/*.*`,
            `${DIST_DIRECTORY}/fonts/*.*`,
            `${DIST_DIRECTORY}/images/*.*`,
            `${DIST_DIRECTORY}/favicon/*.*`
        ]
    })
]

/**
 * Minimizers definitions
 */

let minimizers = [
    new OptimizeCssAssetsPlugin({})
]

if (NODE_ENV !== 'development') {
    minimizers.push(uglifyjsPlugin)
}
const WEBPACK_CONFIG = {
    entry: [
        '@babel/polyfill',
        './src/index.js'
    ],
    plugins: WEBPACK_PLUGINS,
    output: {
        globalObject: "this",
        path: path.join(__dirname, DIST_DIRECTORY),
        filename: WEBPACK_FILE_NAME_TEMPLATE + '.js',
      
        },
    devtool: (NODE_ENV === 'development' ? 'inline-source-map' : false),
    devServer: {
        open: false,
        overlay: {
            warnings: false,
            error: true
        }
    },
    resolve: {
        modules: [
            path.resolve('./'),
            "node_modules"
        ]
    },
    optimization: {
        minimizer: minimizers,
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "babel-loader",
                include: [path.join(__dirname, 'src')],
                exclude: /node_modules\//
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            outputPath: 'images/',
                            name: '[name].[ext]',
                            mimetype: 'image/svg_xml'
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            outputPath: 'images/',
                            name: '[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            outputPath: 'images/',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test : /\.svg(\?v=d+\.\d+\.\d+)?$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            outputPath: 'images/',
                            name: '[name].[ext]',
                            mimetype: 'image/svg+xml'
                        }
                    }
                ]
            }

        ]
    }
}

// new CleanWebpackPlugin(
//     WEBPACK_PLUGINS,
//    [
//        `${DIST_DIRECTORY}/*.*`,
//        `${DIST_DIRECTORY}/fonts/*.*`,
//        `${DIST_DIRECTORY}/images/*.*`,
//        `${DIST_DIRECTORY}/favicon/*.*`
//    ]
// )

/**
 * Done
 */
module.exports = WEBPACK_CONFIG