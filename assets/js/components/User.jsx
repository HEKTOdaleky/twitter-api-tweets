import React from "react";

let User = props => {
  const {user} = props;
  const headerStyle = {
    backgroundImage: 'url(' + user.profileBannerUrl + ')'
  };

  return (
    <header id="header" className="user-info" style={headerStyle}>
      <div className="wrapper">
        <div className="user-info_picture">
          <a href="#">
            <img src={user.profileImageUrl} alt={"user-" + user.id} />
          </a>
        </div>
        <div className="user-info_name">
          <span className="user-info_name_main">{user.name}</span>
          <span className="user-info_name_pseudo">@{user.screenName}</span>
        </div>
        <div className="user-info_profile">
          <menu>
            <li className="user-info_profile_followers">
              <span className="description">Folowers</span>
              <span className="count">{user.followersCount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}</span>
            </li>
            <li className="user-info_profile_following">
              <span className="description">Following</span>
              <span className="count">{user.friendsCount.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}</span>
            </li>
          </menu>
        </div>
      </div>
    </header>
  );
}

export default User
