import * as Application from 'koa';

const app = new Application();

app.use(ctx => ctx.body = 'Hello Picter!');

app.listen(3141);
