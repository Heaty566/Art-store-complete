import React, { Component } from "react";
import "./order.scss";

import { Link } from "react-router-dom";

class Invalid extends Component {
  state = {};
  render() {
    return (
      <div className="order__container">
        <div className="order__wrapper">
          <img src="/page/icon.png" alt="icon" />
          <h3>404 Not Found</h3>
          <Link to="/home">Go Back Home</Link>
        </div>
      </div>
    );
  }
}

export default Invalid;
