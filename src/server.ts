import * as Application from 'koa';

import { renderPage } from './renderer';

const app = new Application();

app.use(ctx => {
  let url = ctx.url;
  if (url.charAt(0) === '/') {
    url = url.substring(1);
  }
  ctx.body = renderPage(url);
});

app.listen(3141);
