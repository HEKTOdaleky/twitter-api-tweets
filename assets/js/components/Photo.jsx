import React from "react";

let Photo = props => {
  const {photos} = props;

  return (
    <section className="main-container photo-container">
      <div>
        {photos.map(photo => <img src={photo.url} alt={"user-photo-" + photo.id} />)}
      </div>
    </section>
  )
}

export default Photo
