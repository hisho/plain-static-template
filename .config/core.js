/*===============================================
　 　　初期設定のため基本的にいじることはなし
      変更したい場合はsettings.jsで追記可能
===============================================*/

class Core {
  constructor() {

    //srcのpath
    const _src = "./src/";
    //staticのpath
    const _static = "./static/";
    //destのpath
    const _dest = `./dist/`;
    //assetsのpath
    const _assets = _dest + "assets/";

    //mapを作成する
    this.config = new Map();

    //mapのpathに先程のsrc,static,dest,assetsを登録する
    this.config.set("path", {
      src: _src,
      static: _static,
      dest: _dest,
      assets: _assets
    });

    //mapのjsにsrcとdestを登録する
    this.config.set("js", {
      src: this.config.get("path").src + "scripts/",
      dest: this.config.get("path").assets + "scripts/"
    });

    //mapのcssにsrcとdestを登録する
    this.config.set("css", {
      src: this.config.get("path").src + "styles/",
      dest: this.config.get("path").assets + "styles/"
    });

    //mapのimageにsrcとdestを登録する
    this.config.set("image", {
      src: this.config.get("path").src + "images/",
      dest: this.config.get("path").assets + "images/"
    });

    //mapのspriteにsrcとdestを登録する
    this.config.set("sprite", {
      src: this.config.get("path").src + "sprite/",
      dest: this.config.get("path").assets + "images/"
    });

    //mapのmkdirに初回自動で掘るpathを登録する
    this.config.set("mkdir", [
      this.config.get("image").src,
      this.config.get("image").src + 'front',
      this.config.get("image").src + 'common',
      this.config.get("sprite").src,
      this.config.get("path").static + 'fonts',
      this.config.get("path").static + 'pdf',
      this.config.get("path").static + 'video',
      this.config.get("path").dest
    ]);

    //mapのclonesに静的にコピーするfromとtoを登録する
    this.config.set("clones", [
      {
        from: this.config.get("path").static + "pdf/**/*.pdf",
        to: this.config.get("path").assets + "pdf"
      },
      {
        from: this.config.get("path").static + "video/*.mp4",
        to: this.config.get("path").assets + "video"
      },
      {
        from:
          this.config.get("path").static +
          "fonts/**/*.+(woff|ttf|truetype|svg)",
        to: this.config.get("path").assets + "fonts"
      }
    ]);

    //mapのwebpackにwebpackのentry pointを登録する
    this.config.set("webpack", {
      entries: {
        //common.css
        [this.config.get("css").dest + "style"]: this.config.get("css").src + "style",
        [this.config.get("css").dest + "utilities"]: this.config.get("css").src + "utilities",
      },
      vendor: []
    });
  }

  //clonesに追加する関数
  setClones(from , to) {
    if (!this.config.has("clones")) return;
    this.config.set("clones", [
      ...this.config.get("clones"),
      { from, to }
    ]);
  }

  //webpackのentry postを追加する関数
  setEntries(key, value) {
    const currentWebpack = this.config.get("webpack");
    currentWebpack.entries[key] = value;
    this.config.set("webpack", {
      ...this.config.get("webpack"),
      ...currentWebpack
    });
  }

  //webpackのvendorを追加する関数
  setExtract(...extracts) {
    const currentWebpack = this.config.get("webpack");
    currentWebpack.vendor = [...currentWebpack.vendor, ...extracts];

    this.config.set("webpack", {
      ...this.config.get("webpack"),
      ...currentWebpack
    });
  }

  //configを返す
  get getConfig() {
    return this.config;
  }
}

module.exports = Core;
