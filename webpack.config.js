const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "pie.min": "./lib/pie.js",
  },
  output: {
    filename: "pie.min.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        include: [path.resolve(__dirname, "lib/")],
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()],
  },
};
