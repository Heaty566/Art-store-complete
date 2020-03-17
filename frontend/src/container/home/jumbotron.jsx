import React, { Component } from "react";

import config from "../../config/main.json";
import JumbotronCreator from "../../components/jumbotron/jumbotronCreator";

class Jumbotron extends Component {
  state = {};
  render() {
    const { jumbotron } = config.home;
    return (
      <React.Fragment>
        <JumbotronCreator slices={jumbotron} />
      </React.Fragment>
    );
  }
}

export default Jumbotron;
