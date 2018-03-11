const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const config = require('config');

const PORT = process.env.port || config.get('default.port');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const routes = require('./routes').routes();
const allowedMethods = require('./routes').allowedMethods();

const app = new Koa();

// x-response-time
app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(logger);
app.use(errorHandler);
app.use(serve('public/'));
app.use(koaBody());
app.use(routes);
app.use(allowedMethods);

app.listen(PORT, () => {
  console.log(`Server work on port ${PORT}...`);
});
