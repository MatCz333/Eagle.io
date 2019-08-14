/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import WorkIcon from "@material-ui/icons/Work";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GroupList from "../GroupList/GroupList";
import withToolTip from "../../hoc/withToolTip/withToolTip";

class WorkspaceList extends Component {
  state = { isOpen: false };

  /**
   * Handler that handle opening, closing te list
   *  */

  handleOpening = element => {
    const { click } = this.props;
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
    click(element);
  };

  render() {
    const { isOpen } = this.state;
    const { workspace, getAllChildrenPerParent, click } = this.props;
    let groupList = null;
    let expandButton = null;
    if (getAllChildrenPerParent(workspace, "Group").length !== 0) {
      groupList = (
        <GroupList
          click={click}
          workspace={workspace}
          getAllChildrenPerParent={getAllChildrenPerParent}
        />
      );
      expandButton = <ExpandMore />;
      if (isOpen) {
        expandButton = <ExpandLess />;
      }
    }
    const workspaceListItem = (
      <div>
        <ListItem
          disabled={
            !!(workspace.children === undefined || workspace.chiildren === 0)
          }
          key={workspace._id}
          button
          onClick={() => this.handleOpening(workspace)}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary={workspace.name}
            secondary={`Created: ${workspace.createdTime.split("T")[0]}`}
          />
          {expandButton}
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {groupList}
        </Collapse>
      </div>
    );
    const WithToolTipWorkspace = withToolTip(workspaceListItem);
    return <WithToolTipWorkspace key={workspace._id} parent={workspace} />;
  }
}

WorkspaceList.propTypes={
  click:PropTypes.func.isRequired,
  workspace:PropTypes.shape({
  }).isRequired,
  getAllChildrenPerParent: PropTypes.func.isRequired
}
export default WorkspaceList;
