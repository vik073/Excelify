// Imports
import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';

// App imports
import { URL_WEB } from 'setup/config/env';
import params from 'setup/config/params';

// Component
class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage();
    return { assets, data, ...page };
  }

  render() {
    const { helmet, assets, data } = this.props;

    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#333333" />
          <link
            rel="mask-icon"
            href={`${URL_WEB}/favicon/safari-pinned-tab.svg`}
            color="#ffffff"
          />
          <link rel="manifest" href={`${URL_WEB}/site.webmanifest`} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${URL_WEB}/favicon/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${URL_WEB}/favicon/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${URL_WEB}/favicon/favicon-16x16.png`}
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href={`${URL_WEB}/favicon/favicon.ico`}
          />

          <meta name="description" content={params.site.description} />
          <meta
            name="keywords"
            content="learning, career, education, courses"
          />
          <meta name="author" content={params.site.author} />
          <meta name="copyright" content={params.site.author} />
          <meta name="application-name" content={params.site.author} />
          <meta name="og:title" content={params.site.name} />
          <meta name="og:description" content={params.site.description} />
          <meta name="og:url" content={URL_WEB} />
          <meta name="og:image" content={`${URL_WEB}/images/logo.jpg`} />
          <meta name="og:site_name" content={params.site.author} />
          <meta name="og:type" content="website" />

          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:400,700,900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Raleway:400,700,900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />

          <AfterData data={data} />

          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}

export default Document;
