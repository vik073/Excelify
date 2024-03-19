// Imports
import express from 'express';
import React from 'react';
import { render } from '@jaredpalmer/after';
import { StoreProvider, createStore } from 'easy-peasy';
import { renderToString } from 'react-dom/server';
import { resetServerContext } from 'react-beautiful-dnd';

// App imports
import routes from 'setup/routes';
import store from 'setup/store';
import Document from 'modules/common/Document';

// Server
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      const customRenderer = node => {
        const App = <StoreProvider store={store}>{node}</StoreProvider>;
        resetServerContext();
        return {
          html: renderToString(App),
          serverState: store.getState()
        };
      };

      const html = await render({
        req,
        res,
        document: Document,
        routes,
        assets,
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        customThing: 'thing',
        customRenderer
      });

      res.send(html);
    } catch (error) {
      console.log(error);
      await res.json(error);
    }
  });

export default server;
