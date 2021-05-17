const path = require(`path`); // 安全にパスを解決する
const fs = require('fs-extra'); // ファイルを操作するrequire(`fs`); // ファイルを操作する
const Settings = require(path.resolve(__dirname, `../settings`)); // 初期設定はsettings.jsonにまとめる
const timeLog = require('./log');

/**
 *ディレクトリを掘る関数
 * @param done
 * @return void
 */
const mkdir = done => {
  const mkdirPaths = [...Settings.get('mkdir')];
  mkdirPaths.forEach(mkdirPath => {
    fs.mkdirsSync(mkdirPath);
    timeLog({key: '🎉make directory', value:  path.join(process.cwd(),mkdirPath), color: 'green'})
  });
  done();
};

module.exports = mkdir;
