import React from 'react';
import { renderPage } from '@src/configs';
import { Layout, SEO } from '@src/layouts';

export default renderPage(
  <Layout page_id="1">
    <SEO />
    index page
    <button type="button">ボタン</button>
    <div id="app" />
  </Layout>
);
