const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "pie.min": "./lib/pie.ts",
  },
  output: {
    filename: "pie.min.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use: ["babel-loader", "awesome-typescript-loader"],
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()],
  },
};
