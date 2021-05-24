/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs-extra');
const Settings = require(`../settings`) // 初期設定はsettings.jsonにまとめる
const glob = require('glob');
const sizeOf = require('image-size')
/* eslint-disable @typescript-eslint/no-var-requires */

const generateImageConstant = (done) => {
const src = Settings.get('image').src;

  //画像をすべて取得
  const AnyImages = glob.sync(`**/*.+(png|jpg)`, {
    ignore: [`**/sp_*.+(png|jpg)`,`**/*@2x.+(png|jpg)`],
    cwd: path.resolve(process.cwd(), src),
  });

  //画像をすべて取得
  const MobileImages = glob.sync(`**/sp_*.+(png|jpg)`, {
    cwd: path.resolve(process.cwd(), src),
  });

  fs.outputFileSync(
    `src/configs/__generate__/images.ts`,
    `export const __IMAGES__ = ${JSON.stringify(AnyImages.map((image) => {
      //現在の画像
      const currentImage = path.resolve(process.cwd(), src + image);
      //現在の画像のサイズを取得
      const imageData = sizeOf(currentImage);
      //現在の画像のbasename(screenshot.png)
      const imageName = path.basename(currentImage);
      //mobile画像のsrc path(common/sp_screenshot.png)
      const mobileSrcPath = (path.dirname(image) + '/sp_' + imageName).replace(/^\.\//,'');
      //現在の画像と一致するmobile画像を取得
      const mobileImage = MobileImages.find((n) => n === mobileSrcPath);

      //mobile画像のpath
      const currentMobileImage = mobileImage ? path.resolve(process.cwd(), src + mobileImage) : null;
      //mobile画像のサイズを取得
      const mobileImageData = currentMobileImage ? sizeOf(currentMobileImage) : null;

      const rootPath = '/assets/images/';

      const create2x = (imagePath) => {
        return imagePath.replace(/\.(png|jpg)$/,'@2x.$1')
      }

      return {
        //common/screenshot.png
        src: image,
        data: {
          desktop: {
            //distに吐き出された画像のroot path
            src: {
              img: rootPath + image,
              srcSet: `${rootPath + image} 1x, ${create2x(rootPath + image)} 2x`,
              srcSetWebp: `${rootPath + image}.webp 1x, ${create2x(rootPath + image)}.webp 2x`
            },
            width: imageData.width,
            height: imageData.height,
          },
          mobile: mobileImage ? {
            //distに吐き出されたmobile画像のroot path
            src: {
              img: rootPath + mobileImage,
              srcSet: `${rootPath + mobileImage} 1x, ${create2x(rootPath + mobileImage)} 2x`,
              srcSetWebp: `${rootPath + mobileImage}.webp 1x, ${create2x(rootPath + mobileImage)}.webp 2x`
            },
            width: mobileImageData.width,
            height: mobileImageData.height
          } : null
        }
      }
    }))
    } as const;`
  );
  done();
};

module.exports = generateImageConstant;
