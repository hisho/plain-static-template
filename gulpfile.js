//初期設定
const Settings = require('./.config/settings');
//ファイルを削除する
const clean = require('./.config/gulp/clean');
//ディレクトリを作る
const mkdir = require('./.config/gulp/mkdir');
//ファイルをクローンする
const clone = require('./.config/gulp/clone');
const image = require('./.config/gulp/image');
const html = require('./.config/gulp/html');
const sprite = require('./.config/gulp/svgSprite');
//gulp本体
const gulp = require('gulp');


exports.clean = clean;
exports.mkdir = mkdir;
exports.clone = clone;
exports.html = html;
exports.image = image;
exports.sprite = sprite;

exports.watch = () => {
  Settings.get('clones').forEach((item) => {
    gulp.watch(item.from, clone);
  });
  gulp.watch([
    `${Settings.get('image').src}**/*.png`,
    `${Settings.get('image').src}**/*.jpg`,
    `${Settings.get('image').src}**/*.svg`,
  ], image);
  gulp.watch([
    `${Settings.get('sprite').src}*.svg`,
  ], sprite);
};
