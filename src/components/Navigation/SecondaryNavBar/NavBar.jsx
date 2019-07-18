import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// MUI
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BackNavigationArrowIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";

// Styling
const useStyles = makeStyles(theme => ({
  navBar: {
    backgroundColor: theme.palette.primary.main
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

/**
 * Represents the navigation bar in application
 */
const NavBar = props => {
  const classes = useStyles(props);
  const { name } = props;
  return (
    <AppBar>
      <Toolbar>
        <Button
          onClick={() => {
            props.history.goBack();
          }}
          className={classes.button}
        >
          <BackNavigationArrowIcon />
          {name}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  name: PropTypes.string.isRequired
};
export default withRouter(NavBar);
