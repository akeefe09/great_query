module.exports = {
  mode: 'development',
  entry: "./lib/main.js",
  output: {
    path: __dirname,
    filename: "./lib/great_query.js"
  },
  devtool: "source-map"
};
