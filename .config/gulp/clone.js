const path = require('path'); // 安全にパスを解決する
const fs = require('fs-extra'); //fsの上位互換
const timeLog = require('./log');
const gulp = require('gulp'); //gulp本体
const Settings = require(path.resolve(__dirname, '../settings')); // 初期設定はsettings.jsonにまとめる
const through = require("through2"); // through2オブジェクトを使用する
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

function getFileStat(path) {
  try {
    return fs.statSync(path);
  } catch (err) {
    if (err.code === "ENOENT") {
      return null;
    } else {
      emit("error", err);
      return 1;
    }
  }
}

const clone = (done) => {
  Settings.get('clones').forEach((item) => {
    gulp.src(item.from)
      .pipe(
        through.obj((file, enc, callback) => {
          const srcPath = file.path.replace(process.cwd(), '');
          const t = new RegExp(item.from.replace(/^\./, '').replace(/\/\*.+$/, ''));
          const name = srcPath.replace(t, '').replace(/^\//, '');
          const distPath = `${item.to}/${name}`.replace(/\/\//,'/');
          const srcStat = dayjs(file.stat.mtime).format();
          const distStat = getFileStat(distPath) ? dayjs(getFileStat(distPath).mtime).format() : undefined;
          if (getFileStat(distPath) && dayjs(srcStat).isBefore(distStat)) {
            file = null;
          } else {
            timeLog({key: 'from', value: srcPath, color: 'blue'}, {key: 'to', value: distPath, color: 'green'});
            file.stat.mtime = new Date();
          }
          callback(null, file);
        })
      )
      .pipe(gulp.dest(item.to))
  })
  done();
}
module.exports = clone;
