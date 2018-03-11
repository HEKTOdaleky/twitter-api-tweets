import { Player } from 'video-react';
import "video-react/dist/video-react.css";

import React from "react";

let Video = props => {
  const {video} = props;

  return (
    <section className="main-container video-container">
      <Player
         playsInline
         poster={video.preview_url}
         src={video.url}
       />
      <footer>
        <span className="duration">{video.duration / 1000} sec.</span>
      </footer>
    </section>
  )
}

export default Video
