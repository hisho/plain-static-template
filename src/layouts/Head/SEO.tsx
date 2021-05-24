import React, {useContext} from "react";
import {Helmet} from "react-helmet";
import {CommonPropsType} from "@src/configs";
import {PageContext} from '@src/store';
import {useSEO} from "@src/hooks";

type SEOPropsType = Partial<Pick<CommonPropsType, 'children'>>

export const SEO: React.VFC<SEOPropsType> = (
  {
    children
  }) => {
  const {page} = useContext(PageContext);
  const SEO = useSEO(page);

  return (
    <Helmet>
      <html lang={SEO.lang}/>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="format-detection" content="telephone=no"/>
      <title>{SEO.title}</title>
      <meta name="description" content={SEO.description}/>
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content={SEO.locale}/>
      <meta property="og:url" content={SEO.path}/>
      <meta property="og:site_name" content={SEO.name}/>
      <meta property="og:title" content={SEO.title}/>
      <meta property="og:description" content={SEO.description}/>
      <meta property="og:image" content={SEO.image}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={SEO.title}/>
      <meta name="twitter:url" content={SEO.url}/>
      <meta name="twitter:description" content={SEO.description}/>
      <meta name="twitter:image" content={SEO.image}/>
      <script src="/assets/scripts/vendor/what-input.min.js" async={true}/>
      <script src="/assets/scripts/main.js" type="module"/>
      <link rel="stylesheet" href="/assets/styles/style.css"/>
      <link rel="stylesheet" href="/assets/styles/utilities.css"/>
      {children}
    </Helmet>
  )
}
