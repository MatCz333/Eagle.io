import * as actionTypes from "./actionTypes";

/** Actions for dataInput view */

export const fetchDataStarted = () => {
  return {
    type: actionTypes.FETCH_DATA_STARTED
  };
};

export const fetchDataSuccess = data => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    data
  };
};

export const fetchDataFailed = error => {
  return {
    type: actionTypes.FETCH_DATA_FAILED,
    error
  };
};
