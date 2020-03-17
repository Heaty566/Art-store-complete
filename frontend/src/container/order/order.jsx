import React, { Component } from "react";
import "./order.scss";

import { Link, withRouter } from "react-router-dom";

class Order extends Component {
  state = {};
  render() {
    const { imageId } = this.props.match.params;

    return (
      <div className="order__container">
        <div className="order__wrapper">
          <img src="/page/icon.png" alt="icon" />
          <h3>Order Success</h3>
          <p>Thank you for your order {imageId}</p>
          <Link to="/home">Go Back Home</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Order);
