import React, { VFC } from 'react';
import { AspectRatio } from '@src/components';
import { breakpointsNamesType } from '@src/configs/variables';
import { CommonPropsType } from '@src/configs';
import { useVariables } from '@src/hooks';
import { __IMAGES__ } from '@src/configs/__generate__/images';

type PicturePropsType = Partial<Pick<CommonPropsType, 'className' | 'style'>> &
  Readonly<{
    aspect?:
      | boolean
      | {
          desktop?: boolean;
          mobile?: boolean;
        };
    breakpoint?: breakpointsNamesType;
    src: typeof __IMAGES__[number]['src'];
    alt?: string;
    backgroundColor?: string;
  }>;

export const Picture: VFC<PicturePropsType> = ({
  breakpoint = 'sm',
  aspect = true,
  src,
  alt = '',
  style = {},
  className = '',
  backgroundColor,
  ...others
}) => {
  const { breakpoints } = useVariables();

  const currentBreakpoint = `(max-width: ${
    breakpoints[breakpoint] / 16 - 0.011
  }em)`;
  const desktopAspect = typeof aspect === 'boolean' ? aspect : aspect.desktop;
  const mobileAspect = typeof aspect === 'boolean' ? aspect : aspect.mobile;

  const imageObject = __IMAGES__.find((n) => n.src === src);
  if (!imageObject) {
    return <div>{src} is not exist</div>;
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
          className={mobileImage ? `hidden ${breakpoint}:block` : ''}
          width={desktopImage.width}
          height={desktopImage.height}
        />
      )}
      <picture data-Picure={''}>
        {mobileImage?.src && (
          <>
            <source
              media={currentBreakpoint}
              srcSet={mobileImage.src.srcSetWebp}
              type="image/webp"
            />
            <source media={currentBreakpoint} srcSet={mobileImage.src.srcSet} />
          </>
        )}
        <source srcSet={desktopImage.src.srcSetWebp} type="image/webp" />
        <img
          src={desktopImage.src.img}
          srcSet={desktopImage.src.srcSet}
          className={`img`}
          width={desktopImage.width}
          height={desktopImage.height}
          alt={alt}
          {...others}
          decoding="async"
        />
      </picture>
    </div>
  );
};
