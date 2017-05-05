import * as Application from 'koa';
import * as livereload from 'livereload';
import * as path from 'path';
import * as sass from 'node-sass';
import * as send from 'koa-send';

import { renderPage } from './renderer';

const lrserver = livereload.createServer({
  exts: ['json', 'md', 'sass', 'ini'],
});
lrserver.watch(path.resolve(__dirname, '..'));

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
  } else if (!url.endsWith('/')) {
    ctx.redirect(ctx.url + '/');
  } else {
    try {
      ctx.body = renderPage(url)
        .replace('</body>', `<script>
          document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
          ':35729/livereload.js?snipver=1"></' + 'script>')
        </script></body>`);
    } catch (err) {
      ctx.status = 500;
      ctx.body = err.message;
    }
  }
});

app.listen(3141);

console.log('@picter/pages running at http://127.0.0.1:3141');
