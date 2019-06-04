import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import BackNavigationArrowIcon from "@material-ui/icons/ArrowBackIos";
import { withRouter } from "react-router-dom";

const SecondaryNavBar = props => {
  const { name } = props;
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <IconButton
          onClick={() => {
            props.history.goBack();
          }}
          color="inherit"
        >
          <BackNavigationArrowIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

SecondaryNavBar.propTypes = {
  name: PropTypes.string.isRequired
};
export default withRouter(SecondaryNavBar);
