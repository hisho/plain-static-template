import React from 'react';
import {renderToStaticMarkup} from "@src/configs";
import {Layout, SEO} from "@src/layouts";
import {Picture} from "@src/components";

export default renderToStaticMarkup(
  <Layout page_id="0">
    <SEO />
    <article>
      <h2>Picture Component</h2>
      <Picture src="dummy/screenshot.png" />
      <Picture src="common/ogp.png" />
    </article>
  </Layout>
);
