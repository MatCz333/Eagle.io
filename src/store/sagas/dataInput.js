/* eslint-disable no-underscore-dangle */
import { put } from "redux-saga/effects";
import axios from "../../axios-eagle";
import * as actions from "../actions";

/** Tranform the data to nested arrays where elements are  grouped by parentId property,
 * if parentId would not exist it's put it as a root. */
function getNestedChildren(rawData) {
  const transformedData = ((dataFromApi, root) => {
    const t = {};
    rawData.forEach(o => {
      Object.assign((t[o._id] = t[o._id] || {}), o);
      t[o.parentId] = t[o.parentId] || {};
      t[o.parentId].children = t[o.parentId].children || [];
      t[o.parentId].children.push(t[o._id]);
    });
    return t[root].children;
  })(rawData, undefined);
  return transformedData;
}

export default function* fetchDataSaga() {
  try {
    const response = yield axios.get("/nodes");
    const convertedData = yield getNestedChildren(response.data);
    yield put(actions.fetchDataSuccess(convertedData));
  } catch (error) {
    yield put(actions.fetchDataFailed(error));
  }
}
