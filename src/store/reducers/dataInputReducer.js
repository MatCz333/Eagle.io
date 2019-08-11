import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../shared/Helpers";

/* eslint no-underscore-dangle: 0 */

const initialState = {
  posting: false,
  data: null,
  loading: false,
  error: false,
  posted: false,
  history: null
};

/*
 * POST METHODS
 */

const postDataInit = (state, action) => {
  return updateObject(state, {
    posting: true,
    fetchLoading: false,
    postLoading: true
  });
};

const postDataStarted = (state, action) => {
  return updateObject(state, action);
};

const postDataSuccess = (state, action) => {
  return updateObject(state, {
    fetchLoading: false,
    postLoading: false,
    posting: false,
    posted: true,
    error: false
  });
};

const postDataFailed = (state, action) => {
  return updateObject(state, {
    posting: false,
    fetchLoading: false,
    postLoading: false,
    posted: false,
    error: true
  });
};

const updatePostStatus = (state, action) => {
  return updateObject(state, {
    posting: false,
    data: null,
    loading: false,
    error: false,
    posted: false
  });
};

/**
 * FETCHING METHODS
 */

const fetchDataSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    fetchLoading: false,
    postLoading: false,
    error: false
  });
};

const fetchDataFailed = state => {
  return updateObject(state, {
    error: true,
    fetchLoading: false,
    postLoading: false
  });
};

const fetchDataStarted = state => {
  return updateObject(state, {
    error: false,
    fetchLoading: true,
    postLoading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_DATA_INIT:
      return postDataInit(state, action);
    case actionTypes.POST_DATA_STARTED:
      return postDataStarted(state, action);
    case actionTypes.POST_DATA_SUCCESS:
      return postDataSuccess(state, action);
    case actionTypes.POST_DATA_FAILED:
      return postDataFailed(state, action);
    case actionTypes.FETCH_DATA_SUCCESS:
      return fetchDataSuccess(state, action);
    case actionTypes.FETCH_DATA_FAILED:
      return fetchDataFailed(state, action);
    case actionTypes.FETCH_DATA_STARTED:
      return fetchDataStarted(state, action);
    case actionTypes.UPDATE_POST_STATUS:
      return updatePostStatus(state, action);
    default:
      return state;
  }
};
export default reducer;
