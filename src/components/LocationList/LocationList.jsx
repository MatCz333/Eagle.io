import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LocationOn from "@material-ui/icons/LocationOn";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import withToolTip from "../../hoc/withToolTip/withToolTip";

const LocationList = props => {
  const { elementSelected, getAllChildrenPerParent, handleNext } = props;
  return (
    <React.Fragment>
      {getAllChildrenPerParent(elementSelected).map(location => (
        <ListItem
          disabled={
            !!(
              location.children === undefined || location.children.length === 0
            )
          }
          onClick={() => handleNext(location)}
          key={location._id}
          button
        >
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText
            inset
            primary={location.name}
            secondary={
              location.children === undefined || location.children.length === 0
                ? ""
                : `Number of sensors ${location.children.length}`
            }
          />
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default LocationList;
