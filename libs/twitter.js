const Twitter = require('twitter');
const config = require('config');

const client = new Twitter(config.get('twitter_api'));

module.exports.tweets = async (screen_name, count, lastTweetId) => {
  return new Promise((resolve, reject) => {
    client.get('statuses/user_timeline', { screen_name, count, exclude_replies: false, max_id: lastTweetId }, (err, tweets, response) => {
      if (err) {
        reject(err);
      }
      resolve(tweets);
    });
  });
}
