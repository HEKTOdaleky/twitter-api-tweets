import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';

import Video from "./components/Video.jsx";
import Gif from "./components/Gif.jsx";
import Photo from "./components/Photo.jsx";
import Tweet from "./components/Tweet.jsx";
import User from "./components/User.jsx";
import Form from "./components/Form.jsx";

const UserPages = [
  { name: 'TheRock', previewImage: "photo_2018-03-11_10-37-32.jpg" },
  { name: 'nycgov', previewImage: "photo_2018-03-11_10-52-02.jpg" },
  { name: 'Marvel', previewImage: "photo_2018-03-11_11-09-15.jpg" },
  { name: 'realBingbingFan', previewImage: "photo_2018-03-11_11-09-18.jpg"},
  { name: 'realjstatham', previewImage: "photo_2018-03-11_11-09-22.jpg"},
  { name: 'GalGadot', previewImage: "photo_2018-03-11_11-09-23.jpg" },
  { name: 'ayu_19980408', previewImage: "photo_2018-03-11_11-09-24.jpg" },
  { name: '20thCenturyFox', previewImage: "20th.jpg" },
  { name: 'OfficialRandL', previewImage: "reading.jpg" },
  { name: 'dumbtobeat', previewImage: "photo3.jpg" }
];

let Content = props => {
  const content = props.tweet.content;

  switch (props.tweet.type) {
    case 'photo':
      return <Photo photos={content} />
      break;
    case 'animated_gif':
      return <Gif gif={content} />
    case 'video':
      return <Video video={content} />
    case 'text':
      return <div className="empty"></div>
    default:
      return <div className="empty"></div>
  }
}

let Preview = props => {
  let goTo = (e) => {
    props.getData(props.page.name);
  };

  let backgroundPreview = {
    backgroundImage: 'url(images/' + props.page.previewImage + ')'
  };

  return (
    <article className="default-pages_container" onClick={goTo} style={backgroundPreview} >
      <footer className="description">
        <span>@{props.page.name}</span>
      </footer>
    </article>
  )
}

function errorHandler(error) {
  switch (error) {
    case 404:
      return "User Not Found"
      break;
    case 403:
      return "Forbidden User Access"
      break;
    case 500:
      return "Internal Server Error"
      break;
    default:
      return "Uknown Error"
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      lastTweetId: 0,
      username: '',
      finish: false
    };
  }

  setDefault = () => {
    this.setState({
      tweets: [],
      lastTweetId: 0,
      username: '',
      finish: false
    })
  }

  loadData = () => {
    axios.post('/', {
      username: this.state.username,
      lastTweetId: this.state.lastTweetId
    })
    .then(({data: tweets}) => {
      this.setState({
        tweets: this.state.tweets.concat(tweets),
        lastTweetId: tweets[tweets.length - 1].tweet.id
      });
      if (this.state.tweets.length % 20 != 0) {
        this.setState({ finish: true });
      }
      console.log(this.state.lastTweetId);
    })
    .catch(console.error);
  }

  getData = username => {
    axios.post('/', {
      username: username
    })
    .then(response => {
      const tweets = response.data;

      this.setState({
        finish: false,
        tweets: tweets,
        username: username,
        lastTweetId: tweets[tweets.length - 1].tweet.id
      });
      if (this.state.tweets.length % 20 != 0 || this.state.tweets.length == 1) {
        this.setState({ finish: true });
      }
    })
    .catch(err => {
      alert(errorHandler(err.response.status));
    });
  }

  render () {
    const { tweets } = this.state;

    if (tweets.length > 0 && tweets[0].user && this.state.finish) {
      return (
        <div>
          <button className="clear-all" onClick={this.setDefault}>Home page</button>
          <Form getData={this.getData} />
          <User user={tweets[0].user} />
          <main>
            <Masonry className="tweet-mansory">
              {tweets.map((tweet, i) => {
                return (
                  <article key={i} className="tweet">
                    <Tweet key={i} tweet={tweet.tweet} />
                    <Content key={i + "-cont"} tweet={tweet} />
                  </article>
                )
              })}
            </Masonry>
          </main>
        </div>
      );
    } else if (tweets.length > 0 && tweets[0].user && !this.state.finish) {
      return (
        <div>
          <button className="clear-all" onClick={this.setDefault}>Home page</button>
          <Form getData={this.getData} />
          <User user={tweets[0].user} />
          <main>
            <InfiniteScroll pageStart={0} loadMore={this.loadData} hasMore={true || false}
              loader={<div className="loader-container">
                <button className="loader-btn" key={0}>Loading ...</button>
              </div>}>
              <Masonry className="tweet-mansory">
                {tweets.map((tweet, i) => {
                  return (
                    <article key={i} className="tweet">
                      <Tweet key={i} tweet={tweet.tweet} />
                      <Content key={i + "-cont"} tweet={tweet} />
                    </article>
                  )
                })}
              </Masonry>
            </InfiniteScroll>
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <Form getData={this.getData} />
          <main>
            <header className="app-guide">
              <center>
                <p>
                  <i className="fas fa-arrow-up"></i>
                </p>
                <h3>Try find you own Twitter page</h3>
              </center>
            </header>
            <div className="default-pages">
              {
                UserPages.map((page, i) => {
                  return (
                    <Preview key={i} getData={this.getData} page={page}/>
                  )
                })
              }
            </div>
          </main>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
