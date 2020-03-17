import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "../../stores/connect/global";

const ProtectRoute = ({ component: Component, user, ...rest }) => {
  return !user.token ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/home" />
  );
};

export default connect(ProtectRoute);
