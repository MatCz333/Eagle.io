import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import fetchDataSaga from "./dataInput";

export default function* watchFetchData() {
  yield takeEvery(actionTypes.FETCH_DATA_STARTED, fetchDataSaga);
}
