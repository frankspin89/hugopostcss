var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: {
        app: './themes/hugopostcss/src/js/main.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'postcss-loader' // compiles Sass to CSS
                    },

                ]
            },
            {
                test: /\.(svg|mp4|woff(2)?)(\?[a-z0-9]+)?$/,
                use: {
                    loader: "file-loader?name=images/[name].[ext]"
                }
            }
        ]
    },

    output: {
        path: path.join(__dirname, "./themes/hugopostcss/static/dist"),
        filename: '[name].bundle.js',
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([{
            from: "favicon/**/*",
            to: "../dist"
        }, {
            from: "images/**/*",
            to: "../dist"
        }, {
            from: "videos/**/*",
            to: "../dist"
        }]),

        new webpack.ProvidePlugin({
            lozad: "lozad"
        })


    ]
}