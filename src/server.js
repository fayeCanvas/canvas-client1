import App from './App';
import React from 'react';import Cookies from 'universal-cookie';

import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
const path = require('path')
import { Provider } from 'react-redux';
import configureAppStore from './ConfigureStore';
var cookieParser = require('cookie-parser')

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const publicFolder = process.env.NODE_ENV === 'production' ? path.join(__dirname, '../build/public') : 'public';

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
    assets[entrypoint].css.map(asset =>
      `<link rel="stylesheet" href="${asset}">`
    ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, ...extra) => {
  return assets[entrypoint] ? assets[entrypoint].js ?
    assets[entrypoint].js.map(asset =>
      `<script src="${asset}" ${extra.join(" ")}></script>`
    ).join('') : '' : '';
};

export const renderApp = (req, res) => {
  const cookies = new Cookies(req.headers.cookie).cookies;
  const context = {};
  console.log('cookies', cookies)
  const preloadedState = {};
  const store = configureAppStore(preloadedState);
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <App serverCookie={cookies.cookies} />
      </StaticRouter>
    </Provider>
  );
  const html = `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Canvas Pad</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${cssLinksFromAssets(assets, 'client')}
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, 'client', 'defer', 'crossorigin')}
  </body>
</html>`
  return { context, html };
}

function ensureSecure(req, res) {
    //Google stores the origin protocol in a header variable. The app itself is isolated within the dyno and all request objects have an HTTP protocol.
    if (req.get('X-Forwarded-Proto')=='https' || req.hostname == 'localhost') {
				if (req.headers.host.match(/^www/) !== null ) {
					res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
				} else {
					//Serve React App by passing control to the next middleware
				}
    } else if(req.get('X-Forwarded-Proto')!='https' && req.get('X-Forwarded-Port')!='443'){
				if (req.headers.host.match(/^www/) !== null ) {
					res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
				} else {
					//Redirect if not HTTP with original request URL
	        res.redirect('https://' + req.hostname + req.url);
				}
    }
}

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(publicFolder))
  .use(cookieParser())
  .get('/*', (req, res) => {
    const { context, html } = renderApp(req, res);
    ensureSecure(req,res)
    if (context.url) {
      if (context.location.pathname == '/login' && !(req.cookies.user === undefined)) {
        res.status(200).send(html);
      } else {
        res.redirect(context.url);
      }
      // res.redirect(context.url);
    } else {
      res.status(200).send(html);
    }
  });

export default server;
