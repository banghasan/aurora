const path = require("path");

module.exports = {
  entry: "./tracker/aurora.js",
  output: {
    path: path.resolve(__dirname, "public/t"),
    filename: "aurora.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
      },
    ],
  },
};
