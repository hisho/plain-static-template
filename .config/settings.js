const Core = require('./core');

//初期設定
//引数にはWordPressのtheme名を入れる
const settings = new Core();

//configにsettingsのconfigを代入
const config = settings.getConfig;

//例
settings.setClones(
  config.get("js").src + "**/*.js",
  config.get("js").dest
);


//例
// settings.setEntries(
//   config.get("js").dest + "main",
//   config.get("js").src + "main",
// );

//extractしたいライブラリを追記していく
// settings.setExtract('gsap');


module.exports = config;
