/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React from "react";
import WorkIcon from "@material-ui/icons/Work";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  icon: {
    paddingLeft: 72,
    marginRight: 0
  },
  listItem: {
    paddingTop: 0,
    paddingLeft: 0
  },
  listItemText: {
    paddingLeft: 10,
    fontSize: "0.9rem"
  }
}));

/**
 * Helper function that checks if workspace has any groups
 * @returns Array Groups per workspace if found or null otherwise
 */
const hasGroups = workspace => {
  const groupsPerWorkspace = [];
  const classes = useStyles();

  if (workspace.children !== undefined) {
    workspace.children.forEach(child => {
      if (child._class === "io.eagle.models.node.Group") {
        groupsPerWorkspace.push(child);
      }
    });
  }
  if (groupsPerWorkspace.length === 0) {
    return null;
  }
  return groupsPerWorkspace.map(group => {
    return (
      <List
        subheader={
          <ListSubheader inset>{`${workspace.name}'s groups:`}</ListSubheader>
        }
        key={group._id}
        disablePadding
      >
        <ListItem className={classes.listItem} button>
          <ListItemIcon className={classes.icon}>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            className={classes.listItemText}
            inset
            primary={group.name}
          />
        </ListItem>
      </List>
    );
  });
};

const ListContent = props => {
  const [open, setOpen] = React.useState(false);
  const { data, click } = props;

  function handleClick() {
    setOpen(!open);
  }

  return (
    <React.Fragment>
      {data.map(workspace => {
        return [
          <div key={workspace._id}>
            <ListItem onClick={handleClick} button key={workspace._id}>
              <Avatar>
                <WorkIcon />
              </Avatar>
              <ListItemText
                primary={workspace.name}
                secondary={`Created: ${workspace.createdTime.split("T")[0]}`}
              />
              {hasGroups(workspace) !== null ? (
                open ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {hasGroups(workspace)}
            </Collapse>
          </div>
        ];
      })}
    </React.Fragment>
  );
};

export default ListContent;
