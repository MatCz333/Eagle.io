import { takeEvery, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { fetchDataSaga, postDataSaga } from "./dataInput";

export default function* watchDataInput() {
  yield takeLatest(actionTypes.FETCH_DATA_STARTED, fetchDataSaga);
  yield takeEvery(actionTypes.POST_DATA_STARTED, postDataSaga);
}
