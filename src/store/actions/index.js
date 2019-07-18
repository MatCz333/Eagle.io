/* eslint-disable import/prefer-default-export */
/**
 * Contains all actions bundled together
 */

export { auth } from "./login";
export {
  fetchDataFailed,
  fetchDataSuccess,
  fetchDataStarted,
  postDataFailed,
  postDataStarted,
  postDataSuccess,
  postDataInit,
  updatePostStatus
} from "./dataInput";
