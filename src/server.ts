import * as Application from 'koa';
import * as send from 'koa-send';

import { renderPage } from './renderer';

const app = new Application();

app.use(async ctx => {
  let url = ctx.url;
  if (url.charAt(0) === '/') {
    url = url.substring(1);
  }
  if (url.endsWith('styles.css')) {
    ctx.status = 404;
  } else if (url.includes('assets')) {
    await send(ctx, url);
  } else {
    ctx.body = renderPage(url);
  }
});

app.listen(3141);
