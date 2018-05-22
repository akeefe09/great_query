module.exports = {
  mode: 'development',
  entry: "./lib/main.js",
  output: {
    path: __dirname,
    filename: "./lib/jquery_lite.js"
  },
  devtool: "source-map"
};
