const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require("./../config");
const { resolve } = require("./../utils");
const { cacheLoader } = require("./loaders");

const cssLoader = (modules) => ({
  loader: "css-loader",
  options: {
    modules: modules
      ? {
          mode: "local",
          localIdentName: "[local]--[hash:base64:8]",
        }
      : false,
  },
});

const sassLoader = {
  loader: "sass-loader",
  options: {
    sassOptions: {
      includePaths: [require("bourbon").includePaths, resolve("src/styles")],
    },
  },
};

const lessLoader = {
  loader: "less-loader",
  options: {
    javascriptEnabled: true,
  },
};

const baseLoaders = (modules) => [
  config.extractCss ? MiniCssExtractPlugin.loader : "style-loader",
  cacheLoader,
  cssLoader(modules),
];

module.exports = [
  {
    test: /\.css$/,
    include: [resolve("node_modules")],
    use: baseLoaders(false),
  },
  {
    test: /\.scss$/,
    include: [resolve("src")],
    use: [...baseLoaders(true), sassLoader],
  },
  {
    // 用于antd按需加载
    test: /\.less$/,
    use: [...baseLoaders(false), lessLoader],
  },
];
