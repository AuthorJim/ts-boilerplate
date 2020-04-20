const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const { IS_DEV } = require("./constants");
const config = require("./config");

module.exports = IS_DEV
  ? {}
  : {
      runtimeChunk: {
        name: "manifest",
      },
      splitChunks: {
        cacheGroups: {
          default: false,
          buildup: {
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
          },
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/](react|react-dom|lodash|moment|mobx|mobx-react|axios)[\\/]/,
            chunks: "all",
            priority: 10,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: Boolean(config.sourceMap),
          extractComments: false,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require("cssnano"),
          cssProcessorOptions: {
            reduceIdents: false,
            autoprefixer: false,
          },
        }),
      ],
    };
