/**
 *  Store all posible error actions for the application
 */
import * as actionTypes from './actionTypes';
 
 
const executeOtherErrorHandler = (error) => {
    return {
        type: actionTypes.HTTP_OTHER_ERROR,
        error
    }
}
 
export const handleHTTPError = (error) => {
        return executeOtherErrorHandler(error); 
}

