const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../'),
  plContext: path.resolve(__dirname, '../external/heart-disease-prediction-pl'),
  root: path.resolve(__dirname, '../../'),

  outputPath: path.resolve(__dirname, '../', 'dist/'),
  outputServerPath: path.resolve(__dirname, '../', 'dist/'),
  templatesOutputServerPath: path.resolve(__dirname, '../', 'dist/'),
  entryPath: path.resolve(__dirname, '../', 'src/index.js'),
  sourcePath: path.resolve(__dirname, '../', 'src/'),

  locales: path.resolve(__dirname, '../', 'static/locales/'),
  images: path.resolve(__dirname, '../', 'static/images/'),
  models: path.resolve(__dirname, '../', 'static/models/'),
  template: path.resolve(__dirname, '../', 'public/index.html'),
  favicon: path.resolve(__dirname, '../', 'public/favicon.ico'),
};
