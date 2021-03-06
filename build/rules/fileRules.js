const { resolve } = require('./../utils')
const { threadLoader, cacheLoader } = require('./loaders')

function getUrlloader(assetsPrefix) {
    return {
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: `${assetsPrefix}/[name].[hash:7].[ext]`
        }
    }
}

module.exports = [
    {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [getUrlloader('img')]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [getUrlloader('fonts')]
    },
    {
        test: /\.svg$/,
        use: [cacheLoader, threadLoader(), '@svgr/webpack'],
        include: resolve('src/renderer')
    }
]
