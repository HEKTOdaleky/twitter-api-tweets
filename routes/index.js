const Router = require('koa-router');
const fs = require('fs');
const config = require('config');
const twitter = require('../libs/twitter');

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(config.get('frontpage.fullPath'));
  await next();
});

const TweetParser = require('../libs/tweet-parser');

router.post('/', async (ctx, next) => {
  const body = ctx.request.body;
  const lastTweetId = body.lastTweetId > 0 ? body.lastTweetId : undefined;

  const tweets = await twitter.tweets(ctx.request.body.username, 20, lastTweetId)
    .then(tweets => {
      return tweets.map(tweet => new TweetParser(tweet).parse());
    })
    .catch(err => {
      if (err.length > 0 && err[0].code == 34) {
        ctx.throw(404);
      } else if (err.message == "HTTP Error: 401 Authorization Required") {
        ctx.throw(403);
      } else {
        ctx.throw(500);
      }
    });

    ctx.body = tweets;
    await next();
});

module.exports.routes = () => router.routes();
module.exports.allowedMethods = () => router.allowedMethods();
