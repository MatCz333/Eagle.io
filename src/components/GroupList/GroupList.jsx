/* eslint-disable no-underscore-dangle */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import Group from "mdi-material-ui/Group";
import useStyles from "./GroupListStyles";

/**
 * Represents the sub list for groups
 * @param {Object} props - Props passed from Main List
 */
const GroupList = props => {
  const { workspace, click, getAllChildrenPerParent } = props;
  const classes = useStyles();
  return (
    <List
      subheader={
        <ListSubheader className={classes.nested} component="div">
          {workspace.name}'s groups:
        </ListSubheader>
      }
      dense
      disablePadding
    >
      {getAllChildrenPerParent(workspace, "Group").map(group => (
        <ListItem
          onClick={() => click(group)}
          key={group._id}
          button
          className={classes.nested}
        >
          <Group />
          <ListItemText inset primary={group.name} />
        </ListItem>
      ))}
    </List>
  );
};

GroupList.propTypes = {
  click: PropTypes.func.isRequired,
  getAllChildrenPerParent: PropTypes.func.isRequired
};
export default GroupList;
