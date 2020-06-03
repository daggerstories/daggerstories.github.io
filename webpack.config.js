const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: __dirname + '/dist'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssNormalize()
              ]
            }
          }
        ]
      },
      {
        test: /\.ico$|\.gif$|\.jpg$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]' // <-- retain original file name
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: __dirname + '/index.html',
      title: 'Dagger Stories',
      currentYear: (new Date()).getFullYear(),
      description: 'Platform-agnostic, non-fiction storytelling. Dagger Stories makes documentaries, reports from the field and manages productions. In addition to developing and running projects, we provide loan-outs for directing, producing, research and development services.',
      typekitId: 'tjo7hjt',
      gaId: 'UA-168355220-1'
    })
  ]
};
