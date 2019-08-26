import * as actionTypes from "../actions/actionTypes";

const initialState = {
  showError: false,
  errorMessage: "",
  code: ""
};

const executeOtherError = (state, action) => {
  return {
    ...state,
    showError: true,
    errorMessage: action.error.response.data.error.message,
    code: action.error.response.data.error.code
  };
};
const resetErrorStatus = state => {
  return {
    ...state,
    showError: false,
    errorMessage: "",
    code: ""
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HTTP_OTHER_ERROR:
      return executeOtherError(state, action);
    case actionTypes.UPDATE_POST_STATUS:
      return resetErrorStatus();
    default:
      return state;
  }
};

export default reducer;
