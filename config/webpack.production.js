const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssWebpackPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const commonPaths = require('./common-paths');

const config = {
  output: {
    filename: 'static/js/[name].[chunkhash:8].bundle.js',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    path: commonPaths.outputServerPath,
    publicPath: '/heart-disease-prediction-app/'
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
        },
      }
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_BASE: JSON.stringify('heart-disease-prediction-app'),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'production' unless process.env.NODE_ENV is defined
    }),
    new Dotenv({
      path: commonPaths.prodEnv,
    }),
    new MiniCssWebpackPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: commonPaths.template,
      title: 'heart-disease-prediction-app',
      base: 'https://kokoro-ai.github.io/heart-disease-prediction-app',
      filename: path.resolve(__dirname, commonPaths.templatesOutputServerPath, 'index.html'),
      favicon: commonPaths.favicon,
    }),
    new CleanWebpackPlugin({
      root: commonPaths.root,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: commonPaths.favicon,
          to: commonPaths.outputServerPath,
        },
        {
          from: commonPaths.models,
          to: path.resolve(commonPaths.outputServerPath, 'models/'),
          toType: 'dir',
        },
      ]
    }),
  ],
};

module.exports = config;
