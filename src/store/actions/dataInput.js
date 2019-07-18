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

/** token for now ( used to authorize in the future when eagle will create authorization endpoint) */
export const postDataInit = () => {
  return {
    posting: true,
    type: actionTypes.POST_DATA_INIT
  };
};
/** token for now ( used to authorize in the future when eagle will create authorization endpoint) */
export const postDataStarted = formData => {
  return {
    formData,
    type: actionTypes.POST_DATA_STARTED
  };
};

export const postDataSuccess = (id, formData) => {
  return {
    type: actionTypes.POST_DATA_SUCCESS,
    orderId: id,
    formData
  };
};

export const postDataFailed = error => {
  return {
    type: actionTypes.POST_DATA_FAILED,
    error
  };
};

export const updatePostStatus = () => {
  console.log("action");
  return {
    type: actionTypes.UPDATE_POST_STATUS
  };
};
