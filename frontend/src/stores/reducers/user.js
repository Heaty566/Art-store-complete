import * as actionTypes from "../action/user";
import { eraseCookie } from "../../utils/cookie";

const initial = {
  token: "",
  user: {}
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.USERLOGIN:
      const newState = Object.assign({}, state);
      newState.token = action.token;
      newState.user = action.user;

      return newState;
    case actionTypes.USERLOGOUT:
      eraseCookie("x-auth-token");
      return {
        ...state,
        token: "",
        user: {}
      };

    default:
      return state;
  }
};

export default reducer;
