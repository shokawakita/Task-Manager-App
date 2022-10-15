const path = require("path");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  mode: "development",
  entry : "./src/index.js",
  // entry : {
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared',
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared',
    // },
    // shared: 'lodash',
  // },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    // filename: "[name].bundle.js",
    // path: path.resolve(__dirname, "build"),
  },
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build")
    },
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/react"],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader","css-loader", "sass-loader"
        ],
      }
    ],
  },
  // plugins: [
	// 	new MiniCssExtractPlugin({
	// 		filename: 'style.css'
	// 	}),
	// 	new FixStyleOnlyEntriesPlugin(),
	// ],
}