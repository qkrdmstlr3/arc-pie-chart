const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    pie: path.resolve(__dirname, "lib/index.js"),
    "pie.min": path.resolve(__dirname, "lib/index.js"),
  },
  output: {
    filename: "pie.js",
    path: path.resolve(__dirname, "./dist"),
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
    minimizer: [new TerserJSPlugin({})],
  },
};
