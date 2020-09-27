// webpack.config.js
const path = require("path");

module.exports = {
    mode: "development",
    module: {
        rules: [{
            loader: "babel-loader",
            // Skip any files outside of your project's `src` directory
            include: [
                path.resolve(__dirname, "src"),
            ],
            // Only run `.js` and `.jsx` files through Babel
            test: /\.jsx?$/,
            // Options to configure babel with
            query: {
                plugins: ['@babel/plugin-proposal-function-bind', "@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-export-default-from"],
                presets: ['@babel/preset-env'],
            }
        }],
        noParse: [/benchmark/]
    },

};
