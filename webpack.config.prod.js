var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanPlugin = require("clean-webpack-plugin");
var HtmlPlugin = require("html-webpack-plugin");

var SRC_PATH = __dirname + "/src";

module.exports = {
    entry: {
        app: SRC_PATH + "/App.js",
        vendor: ["react", "react-dom", "redux", "react-redux", "redux-thunk", "classnames", "react-fastclick"]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].[chunkhash:8].js",
        publicPath: "/portal/dist/"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: "babel"
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract("style", ["css", "autoprefixer", "less"])
        }, {
            test: /\.(eot|woff|svg|ttf|woff2)(\?|$)/,
            exclude: /^node_modules$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            loader: "url-loader?limit=4096&name=images/[name].[ext]"
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlPlugin({
            filename: "../index.html",
            template: SRC_PATH + "/templates/index.html",
            chunksSortMode: "dependency"
        }),
        new ExtractTextPlugin("css/[name].[contenthash:8].css"),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),
        new CleanPlugin(["dist"])
    ]
};