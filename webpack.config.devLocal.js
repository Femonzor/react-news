var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanPlugin = require("clean-webpack-plugin");
var HtmlPlugin = require("html-webpack-plugin");

var ROOT_PATH = __dirname;
var SRC_PATH = ROOT_PATH + "/src";
var DIST_PATH = ROOT_PATH + "/dist";
var SITE_DIR = "/react-news";

module.exports = {
    devtool: "source-map",
    entry: SRC_PATH + "/App.js",
    output: {
        path: DIST_PATH,
        filename: "bundle.js",
        publicPath: SITE_DIR + "/dist/"
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
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new HtmlPlugin({
            filename: "../index.html",
            template: SRC_PATH + "/templates/index.html",
            hash: false,
        }),
        new ExtractTextPlugin("css/[name].css"),
        new CleanPlugin(["dist"])
    ]
};