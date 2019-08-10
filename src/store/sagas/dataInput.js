/* eslint-disable no-underscore-dangle */
import { put } from "redux-saga/effects";
import moment from "moment-timezone";
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

/**
 * A saga that handles asynchronous side effects of fetching the data from API
 */
export function* fetchDataSaga() {
  try {
    const response = yield axios.get("/nodes");
    const convertedData = yield getNestedChildren(response.data);
    yield put(actions.fetchDataSuccess(convertedData));
  } catch (error) {
    yield put(actions.fetchDataFailed(error));
  }
}

/**
 * A saga that handles asynchronous side effects of posting the data to API
 */
export function* postDataSaga(action) {
  const { formData } = action;
  const { date } = formData;
  const parametersArray = [];
  const data = [];
  const values = {};
  Object.entries(formData).forEach((entries, index) => {
    if (entries[0] !== "date") {
      // get parameters ID'S
      parametersArray.push(`${entries[0]}(columnIndex:${index})`);
      // get values
      values[index] = { v: parseInt(entries[1], 10) };
    }
  });

  data.push({
    "ts": moment(date).toISOString(),
    "f": values
  });

  const updatedBodyValues = {
    docType: "jts",
    version: "1.0",
    // create body data for http request
    data
  };
  // create paramaters List
  const parameters = {
    params: parametersArray.join(",")
  };

  try {
    const response = yield axios.put(
      "/historic",
      updatedBodyValues,
      {
        params: parameters
      }
    );
    yield put(actions.postDataSuccess(response.data.name, action.formData));
  } catch (error) {
    yield put(actions.postDataFailed(error));
  }
}
