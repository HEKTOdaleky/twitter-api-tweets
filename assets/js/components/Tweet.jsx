import React from "react";

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let Tweet = props => {
  const {tweet} = props;

  const tweetDate = new Date(Date.parse(tweet.createdAt.toString().replace(/( \+)/, ' UTC$1')));

  return (
    <section className="user-tweet">
      <small className="create-date">{`${tweetDate.getDate()} ${MONTHS[tweetDate.getMonth() - 1]} ${tweetDate.getFullYear()} At ${tweetDate.getHours()}:${tweetDate.getMinutes()}`}</small>
      <div className="tweet-text">
        <p>{tweet.text.replace(/(?:https?|ftp|http):\/\/[\n\S]+/g, '')}</p>
      </div>
      <div className="tweet-info">
        <span className="tweet-info_favorite">{tweet.favoriteCount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}<i className="fas fa-heart"></i></span>
        <span className="tweet-info_retweet">{tweet.retweetCount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}<i className="fas fa-retweet"></i></span>
      </div>
    </section>
  );
};

export default Tweet
