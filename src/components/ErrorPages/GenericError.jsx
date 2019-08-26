import React from "react";
import { makeStyles } from "@material-ui/styles";
// Styling
const useStyles = makeStyles(theme => ({
  InternalServer: {
    color: "red"
  },
  ErrorWrapper: {
    height: "80%",
    width: "100%",
    top: 48,
    position: "absolute"
  }
}));

/**
 * Component that represents the generic error
 */
function GenericError(props) {
  const { errorMessage, errorCode } = props;
  const classes = useStyles(props);
  return (
    <section className={classes.ErrorWrapper}>
      <p className={classes.InternalServer}>
        {errorCode}
        {errorMessage}
      </p>
    </section>
  );
}

export default GenericError;
