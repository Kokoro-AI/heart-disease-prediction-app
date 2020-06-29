const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssWebpackPlugin = require('mini-css-extract-plugin');

const commonPaths = require('./common-paths');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8091;
const URL_BASE = process.env.URL_BASE || `http://${HOST}:${PORT}`;

const config = {
  entry: [
    'react-hot-loader/patch',
  ],
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: PORT,
    headers: { 'Access-Control-Allow-Origin': '*' },
    public: URL_BASE,
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_BASE: JSON.stringify(''),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    }),
    new Dotenv({
      path: commonPaths.devEnv,
    }),
    new MiniCssWebpackPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css',
    }),
    new HtmlWebpackPlugin({
      template: commonPaths.template,
      base: URL_BASE,
      title: 'Heart Disease Prediction App',
      filename: path.resolve(__dirname, commonPaths.outputPath, 'index.html'),
      favicon: commonPaths.favicon,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: commonPaths.favicon,
          to: commonPaths.outputPath,
        },
        {
          from: commonPaths.models,
          to: path.resolve(commonPaths.outputPath, 'models/'),
          toType: 'dir',
        },
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = config;
