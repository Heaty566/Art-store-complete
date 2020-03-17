import React, { Component } from "react";

import "./userProfile.scss";
import UserProfile from "./userProfile";
import ImagesUser from "./imagesUser";

class Profile extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="profile__user-top">
          <UserProfile />
        </div>
        <div className="profile__user-bottom">
          <ImagesUser />
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
