var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlPlugin = require("html-webpack-plugin");

var SRC_PATH = __dirname + "/src";

module.exports = {
    devtool: "source-map",
    entry: [
        "webpack-dev-server/client?http://localhost:9990",
        "webpack/hot/only-dev-server",
        SRC_PATH + "/App.js"
    ],
    output: {
        filename: "bundle.js",
        publicPath: "http://localhost:9990/portal/dist/",
        path: "./portal/dist"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loaders: ["react-hot", "babel"]
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
    devServer: {
        host: "0.0.0.0",
        inline: true,
        compress: true,    //是否启用gzip压缩
        port: 9990,
        hot: true
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
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/[name].css")
    ]
};