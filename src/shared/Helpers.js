import moment from "moment-timezone";

// Helper functions for application usage

/**
 * Helper function that converts node rawTimeZone(Zulu zone) from eagle.API to currentTimeZone
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

/**
 * Helper function that update object with new properties
 * @param Object oldObject that you want to update
 * @param Object updatedProperties properties that you want to inject into object
 * @return Object updated Object with updatedProperties merged inside
 */
const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export default updateObject;
