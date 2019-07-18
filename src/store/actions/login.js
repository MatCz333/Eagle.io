import axios from "../../axios-eagle";
import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS } from "./actionTypes";

/**
 * Login authentication related actions
 */

export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = loginDetails => ({
  type: LOGIN_SUCCESS,
  loginDetails
});

export const loginFail = error => ({
  type: LOGIN_FAIL,
  error
});

/**
 * Async action for authentication
 */
export const auth = () => dispatch => {
  dispatch(loginStart());
  axios
    .get("nodes")
    .then(response => {
      dispatch(loginSuccess(response));
    })
    .catch(error => {
      dispatch(loginFail(error));
    });
};
