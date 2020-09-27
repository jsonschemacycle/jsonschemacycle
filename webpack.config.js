// webpack.config.js
const path = require("path");

module.exports = {
    mode: "development",
    module: {
        rules: [{
            loader: "babel-loader",
            include: [path.resolve(__dirname, "src")],
            exclude: [path.resolve(__dirname, "node_modules")],
            test: /\.jsx?$/,
            query: {
                plugins: [
                    '@babel/plugin-proposal-function-bind',
                    "@babel/plugin-transform-modules-commonjs"
                ],
                presets: [
                    ["@babel/preset-env", {
                        "modules": "commonjs",
                        "useBuiltIns": "entry",
                        "targets": {
                            "node": "current"
                        }
                    }]
                ],
            }
        }]
    },
    output: {
        path: __dirname,
        filename: './dist/jsonschemacycle.js',
        library: "jsonschemacycle",
        libraryTarget: "umd"
    }
};
