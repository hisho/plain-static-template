import React, {VFC} from 'react';
import {CommonPropsType} from "@src/configs";

type PicturePropsType = Partial<Pick<CommonPropsType, 'className' | 'style'>> & {
  src: string;
  alt?: string;
};

export const Picture: VFC<PicturePropsType> = (
  {
    src,
    className = '',
    style = {},
    alt = '',
  }) => {

  return (
    <picture>
      <img className={`img ${className}`} src={src} alt={alt} style={style}/>
    </picture>
  );
};
