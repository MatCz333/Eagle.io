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

export function* fetchDataSaga() {
  try {
    const response = yield axios.get("/nodes");
    const convertedData = yield getNestedChildren(response.data);
    yield put(actions.fetchDataSuccess(convertedData));
  } catch (error) {
    yield put(actions.fetchDataFailed(error));
  }
}

export function* postDataSaga(action) {
  console.log(action);
  const id = Object.keys(action.formData)[0];
  const updatedBodyValues = {
    docType: "jts",
    version: "1.0",
    data: [
      {
        ts: Date.now(),
        f: { "0": { v: 30 }, "1": { v: 40 } }
      },
      {
        ts: Date.now(),
        f: { "0": { v: 50 } }
      }
    ]
  };

  const parameters = {
    params: `${id}(columnIndex:0)`
  };
  try {
    const response = yield axios.put("/historic", updatedBodyValues, {
      params: parameters
    });
    yield put(actions.postDataSuccess(response.data.name, action.formData));
  } catch (error) {
    yield put(actions.postDataFailed(error));
  }
}

/**
 * Convert node rawTimeZone(Zulu zone) from eagle.API to currentTimeZone MOVE TO HELPER FUNCTIONS
 */
export function convertDataToCurrentTimeZone(
  nodeSourceTimeZone,
  parameterTime
) {
  const rawTimeZone = moment(parameterTime);
  const convertedNodeTime = rawTimeZone
    .tz(nodeSourceTimeZone)
    .format("l, h:mm:ss a ");
  return convertedNodeTime;
}
