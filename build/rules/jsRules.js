const { resolve } = require("./../utils");
const { cacheLoader, threadLoader } = require("./loaders");

module.exports = [
  {
    test: /\.(j|t)sx?$/,
    include: [resolve("src")],
    exclude: [/node_modules/],
    use: [
      cacheLoader,
      threadLoader(),
      {
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["chrome >= 78"] },
                useBuiltIns: "usage",
                corejs: 3,
              },
            ],
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
          plugins: [
            [
              "import",
              { libraryName: "antd", libraryDirectory: "lib", style: true },
            ],
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-optional-chaining",
          ],
        },
      },
    ],
  },
];
