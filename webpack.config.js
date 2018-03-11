const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require("html-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: path.resolve(__dirname, 'app/style.sass'),
  publicPath: path.resolve(__dirname, 'app/')
});

module.exports = {
  entry: {
    bundle: './assets/js/index.js',
    style: './assets/css/style.sass'
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(pug|jade)$/,
        exclude: /(node_modules|bower_components)/,
        use:  [
          'html-loader',
          {
          loader: 'pug-html-loader',
          options: {
            data: {}
          }}
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./views/index.pug",
      filename: "./index.html",
      inject: true
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ],
  watch: true
};
