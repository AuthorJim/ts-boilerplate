const { IS_DEV } = require("./constants");
const { resolve } = require("./utils");

module.exports = {
  index: resolve("index.html"),
  appTitle: "Admin管理系统",
  assetsRoot: resolve("dist/"),
  assetsPublicPath: IS_DEV ? "/" : "./dist/",
  // 正式环境接入sentry需要sourceMap
  // https://webpack.docschina.org/configuration/devtool/
  sourceMap: IS_DEV ? "source-map" : false,
  extractCss: !IS_DEV,
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report,
};
