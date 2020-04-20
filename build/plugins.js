const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { TypedCssModulesPlugin } = require("typed-css-modules-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

const { compilerHooks } = require("./custom-plugins");
const { IS_DEV } = require("./constants");
const config = require("./config");
const { resolve } = require("./utils");

const basePlugins = [
  new MomentLocalesPlugin({
    localesToKeep: ["es-us", "zh-cn"],
  }),
  new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  new TypedCssModulesPlugin({
    globPattern: "src/!(styles)/**/*.scss",
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: "[file].map",
    // 自定义sourcemap访问路径(支持接入sentry)
    publicPath: "./",
  }),
  new webpack.ProvidePlugin({
    React: "react",
    Component: ["react", "Component"],
  }),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: resolve("./tsconfig.json"),
    eslint: true,
    async: false,
  }),
];

const devPlugins = [
  new CaseSensitivePathsPlugin(),
  new HtmlWebpackPlugin({
    filename: "index.html",
    title: config.appTitle,
    template: "build/tpl/index.html",
    inject: true,
  }),
  ...compilerHooks,
];

const prodPlugins = [
  new HtmlWebpackPlugin({
    filename: config.index,
    template: "build/tpl/index.html",
    title: config.appTitle,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: "dependency",
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[name].[id].css",
  }),
];

if (config.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
  prodPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = basePlugins.concat(IS_DEV ? devPlugins : prodPlugins);
