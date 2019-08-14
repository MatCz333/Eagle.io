import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LocationOn from "@material-ui/icons/LocationOn";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";

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
          // eslint-disable-next-line no-underscore-dangle
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
LocationList.propTypes= {
  elementSelected:PropTypes.shape({}).isRequired,
  getAllChildrenPerParent:PropTypes.func.isRequired,
  handleNext:PropTypes.func.isRequired
}
export default LocationList;
