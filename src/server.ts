import * as Application from 'koa';
import * as livereload from 'livereload';
import * as path from 'path';
import * as send from 'koa-send';

import { renderPage } from './renderer';
import { renderStylesheet } from './styles';

const lrserver = livereload.createServer({
  exts: ['json', 'md', 'sass', 'ini', 'hbs'],
});
lrserver.watch(process.cwd());

const app = new Application();

app.use(async ctx => {
  let url = ctx.url;
  if (url.charAt(0) === '/') {
    url = url.substring(1);
  }
  url = 'source/' + url;
  if (url.endsWith('styles.css')) {
    ctx.type = 'text/css';
    ctx.body = await renderStylesheet(url.replace('.css', '/index.sass'));
  } else if (url.includes('assets')) {
    await send(ctx, url);
  } else if (!url.endsWith('/')) {
    ctx.redirect(ctx.url + '/');
  } else {
    try {
      ctx.body = renderPage(url) +
        `<script>
          document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
          ':35729/livereload.js?snipver=1"></' + 'script>')
        </script>`;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err.message;
    }
  }
});

app.listen(3141);

console.log('@picter/pages running at http://127.0.0.1:3141');
