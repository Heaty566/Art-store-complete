import React from "react";
import { connect } from "../../stores/connect/global";
import { getCookie } from "../../utils/cookie";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return getCookie("x-auth-token") ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/home" />
  );
};

export default connect(PrivateRoute);
