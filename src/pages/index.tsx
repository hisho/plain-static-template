import React from 'react';
import {renderToStaticMarkup} from "@src/configs";
import {Layout, SEO} from "@src/layouts";

export default renderToStaticMarkup(
  <Layout page_id="1">
    <SEO />
    index page
    <button type="button">ボタン</button>
    <div id="app" />
  </Layout>
);
