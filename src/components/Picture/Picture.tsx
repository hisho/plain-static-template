import React, {VFC} from 'react';
import {AspectRatio} from '@src/components';
import {__IMAGES__} from "@src/configs/__generate__/images";
import {CommonPropsType} from '@src/configs';

const breakpoints = {
  xs: 640,
  sm: 640
} as const;

type PicturePropsType = Partial<Pick<CommonPropsType, 'className' | 'style'>> &
  Readonly<{
    aspect?:
      | boolean
      | {
      desktop?: boolean;
      mobile?: boolean;
    };
    breakpoint?: keyof typeof breakpoints;
    src: typeof __IMAGES__[number]['src'];
    alt?: string;
    backgroundColor?: string;
  }>;

export const Picture: VFC<PicturePropsType> = (
  {
    breakpoint = 'xs',
    aspect = true,
    src,
    alt = '',
    style = {},
    className = '',
    backgroundColor,
    ...others
  }) => {

  const currentBreakpoint = `(max-width: ${breakpoints[breakpoint] - 0.02}px)`;
  const desktopAspect = typeof aspect === 'boolean' ? aspect : aspect.desktop;
  const mobileAspect = typeof aspect === 'boolean' ? aspect : aspect.mobile;

  const imageObject = __IMAGES__.find((n) => n.src === src);
  if (!imageObject) {
    return (
      <div>{src} is not exist</div>
    )
  }

  const desktopImage = imageObject.data.desktop;
  const mobileImage = imageObject.data.mobile;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: `100%`,
        height: 'inherit',
        ...style,
      }}
    >
      {mobileAspect && mobileImage && (
        <AspectRatio
          className={`block ${breakpoint}:hidden`}
          width={mobileImage.width}
          height={mobileImage.height}
        />
      )}
      {desktopAspect && (
        <AspectRatio
          className={`hidden ${breakpoint}:block`}
          width={desktopImage.width}
          height={desktopImage.height}
        />
      )}
      <picture>
        {mobileImage?.src && (
          <>
            <source
              media={currentBreakpoint}
              srcSet={mobileImage.src.srcSetWebp}
              type="image/webp"
            />
            <source
              media={currentBreakpoint}
              srcSet={mobileImage.src.srcSet}
            />
          </>
        )}
        <source
          srcSet={desktopImage.src.srcSetWebp}
          type="image/webp"
        />
        <img
          src={desktopImage.src.img}
          srcSet={desktopImage.src.srcSet}
          className={`img`}
          width={desktopImage.width}
          height={desktopImage.height}
          alt={alt}
          {...others} decoding="async"/>
      </picture>
    </div>
  );
};
