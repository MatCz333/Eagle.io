import * as actionTypes from "../actions/actionTypes";
import updateObject from "../Utility";

/* eslint no-underscore-dangle: 0 */

const initialState = {
  data: null,
  loading: false,
  error: false
};

/**
 *Succesfully fetched data  from eagle.io API
 */
const fetchDataSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    loading: false,
    error: false
  });
};

const fetchDataFailed = state => {
  return updateObject(state, { error: true, loading: false });
};

const fetchDataStarted = state => {
  return updateObject(state, { error: false, loading: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_SUCCESS:
      return fetchDataSuccess(state, action);
    case actionTypes.FETCH_DATA_FAILED:
      return fetchDataFailed(state, action);
    case actionTypes.FETCH_DATA_STARTED:
      return fetchDataStarted(state, action);
    default:
      return state;
  }
};
export default reducer;
