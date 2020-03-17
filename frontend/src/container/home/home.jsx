import React, { Component } from "react";

import Jumbotron from "./jumbotron";
import Images from "./images";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Jumbotron />
        <Images />
      </React.Fragment>
    );
  }
}

export default Home;
