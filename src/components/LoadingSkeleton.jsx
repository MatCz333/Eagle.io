import React from "react";
// MUI
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

/**
 * Styling
 */
const useStyles = makeStyles(theme => {
  return {
    primaryText: {
      display: "block",
      borderRadius: 50,
      width: 50,
      height: 4,
      backgroundColor: "rgba(0, 0, 0, 0.87)",
      marginBottom: 12
    },
    secondaryText: {
      display: "block",
      borderRadius: 50,
      width: 80,
      height: 4,
      marginBottom: 12,
      backgroundColor: "rgba(0, 0, 0, 0.54);"
    },
    subheader: {
      display: "block",
      borderRadius: 50,
      paddingLeft: 16,
      marginTop: 16,
      marginBottom: 22,
      width: 100,
      height: 8,
      backgroundColor: theme.palette.secondary.main
    },
    icon: {
      svg: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: 40
      }
    }
  };
});

/**
 * Functionality
 */
function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

/** Component */
const LoadingSkeleton = props => {
  const classes = useStyles(props);
  return (
    <List
      dense
      subheader={
        <ListSubheader component="div">
          <span className={classes.subheader} />
        </ListSubheader>
      }
    >
      {generate(
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            inset
            primary={<span className={classes.primaryText} />}
            secondary={<span className={classes.secondaryText} />}
          />
        </ListItem>
      )}
    </List>
  );
};

export default LoadingSkeleton;
