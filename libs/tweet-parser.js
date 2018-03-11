module.exports = class Tweets {
  constructor(tweet) {
    this.tweet = tweet;
  }

  getUserInfo(tweet) {
    let user = tweet.user;

    return {
      id: user.id,
      name: user.name,
      screenName: user.screen_name,
      followersCount: user.followers_count,
      friendsCount: user.friends_count,
      listedCount: user.listed_count,
      profileImageUrl: user.profile_image_url.replace(/_normal/g, ''),
      profileBannerUrl: user.profile_banner_url
    };
  }

  getTweetInfo(tweet) {
    return {
      id: tweet.id,
      createdAt: tweet.created_at,
      text: tweet.text,
      retweetCount: tweet.retweet_count,
      favoriteCount: tweet.favorite_count
    };
  }

  getVideoInfo(tweet) {
    let video = tweet.extended_entities.media[0];
    let videoVariants = video.video_info.variants;

    return {
      id: video.id,
      duration: video.video_info.duration_millis,
      content_type: video.video_info.variants[0].content_type,
      preview_url: tweet.media_url,
      url: videoVariants.filter(variant => variant.content_type == 'video/mp4')[0].url
    };
  }

  getPhotoInfo(tweet) {
    let photos = tweet.extended_entities.media;

    return photos.map(photo => (
      {
        id: photo.id,
        url: photo.media_url
      }
    ));
  }

  getGifInfo(tweet) {
    let gif = tweet.extended_entities.media[0];

    return {
      id: gif.id,
      content_type: gif.video_info.variants[0].content_type,
      preview_url: gif.media_url,
      url: gif.video_info.variants[0].url
    };
  }

  checkContent(tweet) {
    if (tweet.extended_entities && tweet.extended_entities.media.length > 0) {
      return tweet.extended_entities.media[0].type;
    } else {
      return 'text';
    }
  }

  parse(tweet = this.tweet) {
    let cleanTweet = {
      user: this.getUserInfo(tweet),
      tweet: this.getTweetInfo(tweet)
    };
    let content = {};
    let contentType = this.checkContent(tweet);

    switch (contentType) {
      case 'video':
        content = {
          type: 'video',
          content: this.getVideoInfo(tweet)
        }
        break;
      case 'photo':
        content = {
          type: 'photo',
          content: this.getPhotoInfo(tweet)
        }
        break;
      case 'animated_gif':
        content = {
          type: 'animated_gif',
          content: this.getGifInfo(tweet)
        }
        break;
      default:
        content = {type: 'text'};
    }

    return Object.assign(cleanTweet, content);
  }
}
