const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "boundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json",".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }

            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", "css-loader"
                ]
            },

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]


}