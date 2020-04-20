const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const config = require("./config");
const { FILE_EXTENSIONS, IS_DEV } = require("./constants");
const styleRules = require("./rules/styleRules");
const jsRules = require("./rules/jsRules");
const fileRules = require("./rules/fileRules");
const nodeRules = require("./rules/nodeRules");
const externals = require("./externals");
const plugins = require("./plugins");
const optimization = require("./optimization");
const { resolve } = require("./utils");
require("./cleanup-folder");

let webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: { bundle: ["./src/index.tsx"] },
  output: {
    path: config.assetsRoot,
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
    publicPath: config.assetsPublicPath,
    pathinfo: false,
    globalObject: "this",
  },
  resolve: {
    extensions: FILE_EXTENSIONS,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve("./tsconfig.json"),
        extensions: FILE_EXTENSIONS,
      }),
    ],
  },
  module: {
    rules: [...styleRules, ...jsRules, ...fileRules, ...nodeRules],
  },
  externals,
  plugins,
  optimization,
  stats: "minimal",
  devtool: false,
};

if (config.speedMeasure) {
  const smp = new SpeedMeasurePlugin();
  webpackConfig = smp.wrap(webpackConfig);
}

if (IS_DEV) {
  webpackConfig.devServer = {
    contentBase: resolve("/"),
    port: 3000,
    hot: true,
    disableHostCheck: true,
    host: "0.0.0.0",
  };
}

module.exports = webpackConfig;
