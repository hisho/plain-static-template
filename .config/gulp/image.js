const path = require(`path`); // 安全にパスを解決する
const fs = require('fs-extra');
const Settings = require(`../settings`) // 初期設定はsettings.jsonにまとめる
const gulp = require('gulp');
const gulpImagemin = require('gulp-imagemin');
const ImageMinMozjpeg = require('imagemin-mozjpeg');
const ImageMinPngquant = require('imagemin-pngquant');
const ImageMinSvgo = require('imagemin-svgo');
const gulpWebp = require('gulp-webp');
const rename = require('gulp-rename');
const through = require("through2"); // through2オブジェクトを使用する
const timeLog = require('./log');
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

const imageMin = (done) => {
  gulp.src(
    [
      `${Settings.get('image').src}**/*.png`,
      `${Settings.get('image').src}**/*.jpg`,
      `${Settings.get('image').src}**/*.svg`,
    ], {
      allowEmpty: true
    }
  )
    .pipe(
      through.obj((file, enc, callback) => {
        const name = file.path.replace(path.resolve(process.cwd() + '/', Settings.get('image').src), '');
        const distPath = `${Settings.get('image').dest}${name}`.replace(/\/\//,'/');
        const srcStat = dayjs(file.stat.mtime).format();
        const distStat = getFileStat(distPath) ? dayjs(getFileStat(distPath).mtime).format() : undefined;
        const from = file.path.replace(process.cwd(), '');
        if (getFileStat(distPath) && dayjs(srcStat).isBefore(distStat)) {
          file = null;
        } else {
          timeLog({key: 'from', value: from, color: 'blue'}, {key: 'to', value: distPath, color: 'green'});
          file.stat.mtime = new Date();
        }
        callback(null, file);
      })
    )
    .pipe(gulpImagemin([
      ImageMinMozjpeg({quality: 80}),
      ImageMinPngquant({quality: [0.6, 0.9]}),
      ImageMinSvgo({
        plugins: [{removeViewBox: false}],
      })
    ]))

    .pipe(gulp.dest(Settings.get('image').dest));
  done();
}

const webp = (done) => {
  gulp.src(
    [
      `${Settings.get('image').src}**/*.png`,
      `${Settings.get('image').src}**/*.jpg`,
    ], {
      allowEmpty: true
    }
  )
    .pipe(
      through.obj((file, enc, callback) => {
        const name = file.path.replace(path.resolve(process.cwd() + '/', Settings.get('image').src), '');
        const distPath = `${Settings.get('image').dest}${name}.webp`;
        const srcStat = dayjs(file.stat.mtime).format();
        const distStat = getFileStat(distPath) ? dayjs(getFileStat(distPath).mtime).format() : undefined;
        const from = file.path.replace(process.cwd(), '');
        if (getFileStat(distPath) && dayjs(srcStat).isBefore(distStat)) {
          file = null;
        } else {
          timeLog({key: 'from', value: from, color: 'blue'}, {key: 'to', value: distPath, color: 'green'});
          file.stat.mtime = new Date();
        }
        callback(null, file);
      })
    )
    .pipe(rename((path) => {
      path.basename += path.extname;
    }))
    .pipe(gulpWebp({
        quality: 80
      })
    )
    .pipe(gulp.dest(Settings.get('image').dest));
  done();
}


const image = gulp.parallel(imageMin, webp);
module.exports = image;
