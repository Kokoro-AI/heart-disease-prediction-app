const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const commonPaths = require('./common-paths');

const URL_BASE = 'https://kokoro-ai.github.io';

const config = {
  output: {
    filename: 'bundle.js',
    path: commonPaths.outputServerPath,
    publicPath: '/heart-disease-prediction-app/',
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      APP_BASE: JSON.stringify('heart-disease-prediction-app'),
    }),
    new TerserWebpackPlugin({
      sourceMap: true,
    }),
    new CleanWebpackPlugin({
      root: commonPaths.root,
    }),
    new CopyWebpackPlugin([
      {
        from: commonPaths.template,
        to: commonPaths.templatesOutputServerPath,
        transform: (content) => Buffer.from(
          content
            .toString()
            .replace('<!-- base -->', `<base href="${URL_BASE}/">`)
            .replace(new RegExp('{{base}}', 'g'), `${URL_BASE}/heart-disease-prediction-app`),
          'utf8',
        ),
      },
      {
        from: commonPaths.favicon,
        to: commonPaths.outputServerPath,
      },
    ]),
  ],
};

module.exports = config;
