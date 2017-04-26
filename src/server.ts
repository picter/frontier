import * as Application from 'koa';
import * as send from 'koa-send';
import * as sass from 'node-sass';

import { renderPage } from './renderer';

const app = new Application();

app.use(async ctx => {
  let url = ctx.url;
  if (url.charAt(0) === '/') {
    url = url.substring(1);
  }
  if (url.endsWith('styles.css')) {
    ctx.type = 'text/css';
    ctx.body = sass.renderSync({
      file: './src/styles.sass',
    }).css;
  } else if (url.includes('assets')) {
    await send(ctx, url);
  } else {
    ctx.body = renderPage(url);
  }
});

app.listen(3141);
