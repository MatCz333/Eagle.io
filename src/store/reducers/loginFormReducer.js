import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../shared/Helpers";

const initialState = {
  error: null,
  loading: false,
  isAuthenticated: false
};

/**
 * Reducer function that updates the state of login component when
 * authentication starts
 * @param  state  Actual state to be updated
 * @return Object updated state
 */
const loginStart = state =>
  updateObject(state, { error: null, loading: true, isAuthenticated: false });

/**
 * Reducer function that updates the state of login component when
 * authentication finished succesfully
 * @param  state  Actual state to be updated
 * @return Object updated stated
 */
const loginSuccess = state =>
  updateObject(state, { error: null, loading: false, isAuthenticated: true });

/**
 * Reducer function that updates the state of login component when
 * authentication fails
 * @param  state  Actual state to be updated
 * @return Object updated state
 */
const loginFail = (state, action) =>
  updateObject(state, {
    error: action.error,
    loading: false,
    isAuthenticated: false
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    default:
      return state;
  }
};

export default reducer;
