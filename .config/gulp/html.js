const path = require(`path`); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, `../settings`)); // 初期設定はsettings.jsonにまとめる
const gulp = require(`gulp`); //gulp本体
const prettyHtml = require(`gulp-pretty-html`); //htmlを整形する
const htmlHint = require(`gulp-htmlhint`); //htmlの品質をチェックする

const html = (done) => {
  gulp
    .src(`${Settings.get('path').dest}**/*.html`)
    .pipe(prettyHtml({
      indent_size: 2,
      indent_char: ' ',
      preserve_newlines: false,
      unformatted: ['code', 'pre', 'em', 'strong', 'i', 'b', 'br']
    }))
    .pipe(htmlHint({
      "tagname-lowercase": false,
      "attr-lowercase": false
    }))
    .pipe(htmlHint.reporter())
    .pipe(htmlHint.failOnError())
    .pipe(gulp.dest(Settings.get('path').dest));
  done();
};

module.exports = html;
