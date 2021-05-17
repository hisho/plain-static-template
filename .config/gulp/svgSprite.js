const path = require(`path`); // 安全にパスを解決する
const fs = require('fs-extra'); // ファイルを操作するrequire(`fs`); // ファイルを操作する
const Settings = require(path.resolve(__dirname, "../settings")); // 初期設定はsettings.jsonにまとめる
const svgSprite = require('gulp-svg-sprite');
const gulp = require(`gulp`);

/**
 * SVGスプライトを作成
 */
const sprite = done => {
  gulp
    .src(`${Settings.get('sprite').src}*.svg`, {since: gulp.lastRun(sprite), allowEmpty: true})
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: `../${Settings.get('sprite').dest}symbol.svg`
        }
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {removeTitle: true}, // titleを削除
                {removeElementsByAttr: true},
                {removeStyleElement: true}, // styleを削除
                {removeAttrs: {attrs: ['fill', 'stroke', 'data-name']}}, //fill,stroke,data-nameを削除
                {removeXMLNS: true}, // xmlnを削除
                {removeDimensions: true} // width/heightを削除
              ]
            }
          }
        ]
      },
      svg: {
        xmlDeclaration: false
      }
    }))
    .pipe(gulp.dest(".")); // symbol.svgを生成
  done();
};

module.exports = sprite;
