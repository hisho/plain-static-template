const path = require('path');
const webpack = require('webpack');
//初期設定はsettings.jsにまとめる
const Settings = require(path.resolve(__dirname, '.config/settings'));

module.exports = () => {
  const MODE = process.env.NODE_ENV;
  const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  return {
    mode: MODE,
    devtool: IS_DEVELOPMENT ? 'inline-source-map' : false,
    entry: Settings.get('webpack').entries,
    resolve: {
      extensions: ['.ts', '.tsx', '.jsx', '.js', '.css'],
      alias: {
        '@src': path.resolve('./src'),
      },
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname),
    },
    target: ['web', 'es5'],
    plugins: [
      new webpack.ProgressPlugin(),
    ],
  }
};
