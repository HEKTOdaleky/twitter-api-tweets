import React from "react";

let Gif = props => {
  const {gif} = props;

  return (
    <section className="main-container animated-gif-container">
      <video loop autoPlay="autoplay">
        <source src={gif.url} type={gif.contentType} poster={gif.preview_url}/>
        Your browser does not support the video tag.
      </video>
    </section>
  )
}

export default Gif
