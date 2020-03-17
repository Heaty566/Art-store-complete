import * as actionTypesUser from "../action/user";
import { connect as reduxConnect } from "react-redux";

const mapPropsToState = state => {
  return {
    user: state.user
  };
};

const mapDispatchToPatch = dispatch => {
  return {
    loginUser: (token, user) =>
      dispatch({ type: actionTypesUser.USERLOGIN, token, user }),
    logoutUser: () => dispatch({ type: actionTypesUser.USERLOGOUT })
  };
};

export const connect = Component => {
  return reduxConnect(mapPropsToState, mapDispatchToPatch)(Component);
};
