const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanCSSPlugin = require("less-plugin-clean-css")
const path = require("path")

const extractLess = new ExtractTextPlugin("style.min.css")

const { WebpackConfig, templateContent } = require("@saber2pr/webpack-configer")

module.exports = WebpackConfig({
  entry: "./src/app.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  output: {
    filename: "bundle.min.js",
    path: path.join(__dirname, "build"),
    publicPath: "/build"
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "/api" },
        changeOrigin: true
      }
    },
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"]
      },
      {
        test: /\.(css|less)$/,
        use: extractLess.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader",
              options: {
                plugins: [
                  new CleanCSSPlugin({
                    advanced: true
                  })
                ]
              }
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(woff|svg|eot|ttf)$/,
        use: ["url-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: templateContent("Messager", {
        injectBody: '<div id="root"></div>',
        injectHead:
          '<script async src="//saber2pr.top/test/tools/debug.min.js"></script>'
      })
    }),
    extractLess
  ],
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules|lib/
  }
})
