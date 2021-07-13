import React from 'react';
import {renderToStaticMarkup} from "@src/configs";
import {Layout, SEO} from "@src/layouts";

export default renderToStaticMarkup(
  <Layout page_id="999999">
    <SEO />
    404 page
  </Layout>
);
