// Utility/ Helper functions for application's store

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
