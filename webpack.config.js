var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack")

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 200
                    }
                }
            },
            { test: /\.(js)$/, use: "babel-loader" },
            {test: /\less$/, use: ["style-loader", "css-loader","less-loader"]},
            { test: /\.css$/, use: ["style-loader", "css-loader"] }
        ]
    },
    mode:  process.env.NODE_ENV === "production" ? "production" : "development",
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env" : {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css)$/
          })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: true,
                    output: {
                        comments: false
                    }
                },
                sourceMap: true,
                exclude: [/\.min\.js$/gi]
            })
        ]
    }
};
