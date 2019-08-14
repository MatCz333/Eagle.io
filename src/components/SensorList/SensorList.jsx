/* eslint-disable no-underscore-dangle */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import VideoInputAntenna from "mdi-material-ui/VideoInputAntenna";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const SensorList = props => {
  const { elementSelected, getAllChildrenPerParent, handleNext } = props;
  return (
    <React.Fragment>
      {getAllChildrenPerParent(elementSelected).map(sensor => (
        <ListItem
          onClick={() => {
            handleNext(sensor);
          }}
          key={sensor._id}
          button
        >
          <ListItemIcon>
            <VideoInputAntenna />
          </ListItemIcon>
          <ListItemText
            inset
            primary={sensor.name}
            secondary={
              sensor.children === undefined || sensor.children.length === 0
                ? ""
                : `Created: ${sensor.createdTime.split("T")[0]}`
            }
          />
          <ListItemSecondaryAction>
            <ListItemIcon>
              <VideoInputAntenna style={{ fill: "#0072ea" }} />
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </React.Fragment>
  );
};
SensorList.propTypes={
  elementSelected:PropTypes.shape({}).isRequired,
  getAllChildrenPerParent:PropTypes.func.isRequired,
  handleNext:PropTypes.func.isRequired
}
export default SensorList;
