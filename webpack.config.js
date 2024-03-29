// Generated using webpack-cli https://github.com/webpack/webpack-cli

const { resolve } = require("path");
const { readFileSync } = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const postcssNormalize = require("postcss-normalize");
const Handlebars = require("handlebars");
const { optimize: optimizeSvg } = require("svgo");

const isProduction = process.env.NODE_ENV == "production";

const PARTIALS = {
  daggerStoriesLogoWhite: optimizeSvg(
    readFileSync(resolve(__dirname, "./src/images/dagger-stories-logo-white.svg"), "utf-8"),
    { path: "dagger-stories-logo-white.svg" }
  ).data,
};

const TEMPLATE_VALUES = {
  title: "Dagger Stories",
  currentYear: (new Date()).getFullYear(),
  description: "Platform-agnostic, non-fiction storytelling. Dagger Stories makes documentaries, reports from the field and manages productions. In addition to developing and running projects, we provide loan-outs for directing, producing, research and development services.",
  typekitId: "tjo7hjt",
  gaId: "UA-168355220-1",
};

const config = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    static: {
      directory: __dirname,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "html-loader",
        options: {
          preprocessor: (content, loaderContext) => {
            let result;

            try {
              Object.entries(PARTIALS).forEach(([name, partial]) => {
                console.log({name: name})
                console.log({partial: partial})
                Handlebars.registerPartial(name, partial);
              });

              result = Handlebars.compile(content)(TEMPLATE_VALUES);
            } catch (error) {
              loaderContext.emitError(error);

              return content;
            }

            return result;
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [
                  postcssNormalize()
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.gif$|\.jpg$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        type: "asset/resource",
        generator : {
          filename : '[name].[hash][ext][query]',
        }
      },
      {
        test: /\.ico$/,
        type: "asset/resource",
        generator : {
          filename : '[name][ext][query]',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.hbs",
      filename: __dirname + "/index.html",
    })
  ]
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
